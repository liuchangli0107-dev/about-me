<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DnsLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Google\Cloud\Firestore\FirestoreClient;
use Throwable;

class DnsController extends Controller
{
    public function index(Request $request)
    {
        $dbPath = database_path('database.sqlite');
        if (!file_exists($dbPath)) {
            $dbDirectory = dirname($dbPath);
            if (!is_dir($dbDirectory)) {
                mkdir($dbDirectory, 0755, true); // 0755 權限通常就夠了
            }
            touch($dbPath);
            chmod($dbPath, 0666); // 確保 PHP 程序有讀寫權限
        }

        // 1. 安全驗證
        $token = $request->header('X-Monitor-Token');
        if ($token !== env('MONITOR_VIEW_TOKEN')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            // --- 從 SQLite 讀取 ---
            $latestLogs = DnsLog::whereIn('id', function ($query) {
                $query->selectRaw('MAX(id)')
                    ->from('dns_logs')
                    ->groupBy('device_name');
            })->orderBy('recorded_at', 'desc')->get();

            return response()->json($latestLogs);

        } catch (\Exception $e) {
            \Log::error('Index Error: ' . $e->getMessage());
            return response()->json([
                'error' => '讀取資料失敗',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 處理 API 請求，解密數據並調用核心邏輯。
     */
    public function store(Request $request)
    {
        if (!\Illuminate\Support\Facades\Schema::hasTable('dns_logs')) {
            \Illuminate\Support\Facades\Schema::create('dns_logs', function ($table) {
                $table->id();
                $table->string('device_name');
                $table->string('domain')->default('unknown');
                $table->string('status');
                $table->integer('count')->default(0);
                $table->integer('latency')->default(0);
                $table->string('recorded_at'); // 對應您代碼中的 recorded_at
                $table->timestamps();
            });
        }

        $deviceId = $request->input('device_id');
        $encryptedData = $request->input('data');

        if (empty($deviceId) || empty($encryptedData)) {
            return response()->json(['error' => '缺少 device_id 或 data 欄位'], 400);
        }

        try {

            // 在 store 方法中找到解密邏輯處
            if (app()->environment('testing') && !is_string($encryptedData)) {
                $batchData = $encryptedData;
            } else {
                // 1. RSA 解密邏輯
                $privateKeyPath = storage_path('app/keys/private.pem');
                if (!file_exists($privateKeyPath)) {
                    return response()->json(['error' => '伺服器私鑰遺失'], 500);
                }

                $privateKey = file_get_contents($privateKeyPath);
                $decrypted = '';

                openssl_private_decrypt(
                    base64_decode($encryptedData),
                    $decrypted,
                    $privateKey,
                    OPENSSL_PKCS1_OAEP_PADDING
                );

                if (empty($decrypted)) {
                    return response()->json(['error' => '解密失敗，資料可能已損毀或金鑰不匹配'], 400);
                }

                $batchData = json_decode($decrypted, true);
            }
            

            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json(['error' => 'JSON 資料格式錯誤'], 400);
            }

            // 2. 調用核心業務邏輯
            $count = $this->processAndSaveLogs($batchData, $deviceId);

            return response()->json(['status' => '處理成功', 'count' => $count], 200);

        } catch (Throwable $e) {
            // 捕獲所有可能的異常，包括 OpenSSL 錯誤
            return response()->json(['error' => '伺服器內部錯誤', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * 核心業務邏輯：處理已解密的數據陣列並寫入資料庫。
     * 
     * @param array $batchData 日誌數據陣列
     * @param string $deviceId 設備 ID
     * @return int 成功處理的紀錄數量
     */
    public function processAndSaveLogs(array $batchData, string $deviceId): int
    {
        if (empty($batchData)) {
            return 0;
        }

        if (env('DB_CONNECTION') === 'firestore') {
            $firestore = $this->getFirestore();
            $batch = $firestore->batch();
            $collection = $firestore->collection('dns_logs');

            foreach ($batchData as $log) {
                $newDoc = $collection->document();
                $batch->set($newDoc, [
                    'device_name' => $deviceId,
                    'domain' => $log['domain'] ?? 'unknown',
                    'status' => $log['status'] ?? 'online',
                    'latency' => (int) ($log['latency'] ?? 0),
                    'recorded_at' => $log['timestamp'] ?? now()->toIso8601String(),
                    'created_at' => new \DateTime(),
                ]);
            }
            $batch->commit();
        } else {
            // 本地 SQLite 模式
            foreach ($batchData as $log) {
                DnsLog::create([
                    'device_name' => $deviceId,
                    'domain' => $log['domain'] ?? 'unknown',
                    'status' => $log['status'] ?? 'online',
                    'latency' => $log['latency'] ?? 0,
                    'recorded_at' => $log['timestamp'] ?? now()->toIso8601String(),
                ]);
            }
        }

        return count($batchData);
    }

    /**
     * 初始化 Firestore (REST 模式封印 gRPC)
     */
    private function getFirestore()
    {
        // 封印 gRPC, 確保在任何環境下都使用 REST API
        putenv('GOOGLE_CLOUD_PHP_GRPC_FOR_FIRESTORE=false');
        putenv('GPB_METADATA_CONF_SKIP_GRPC_CHECK=1');

        return new FirestoreClient([
            'projectId' => env('FIRESTORE_PROJECT_ID', env('GOOGLE_CLOUD_PROJECT')),
            'transport' => 'rest',
        ]);
    }
}
