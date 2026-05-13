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
                $table->integer('count')->default(0);
                $table->string('recorded_at'); // 對應您代碼中的 recorded_at
                $table->timestamps();
            });
        }

        // 1. 取得參數並設定防呆預設值
        $deviceId = $request->input('device_id', 'Unknown');
        $reportType = $request->input('report_type', 'schedule_event');
        $recordedAt = $request->input('recorded_at', now()->toDateTimeString());
        $encryptedData = $request->input('data', '');

        Log::info('DNS 數據同步點名', [
            '設備名稱' => $deviceId,
            '報告類型' => $reportType,
            '目標日期' => $recordedAt,
            '傳入數據' => $encryptedData
        ]);

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
            $count = $this->processAndSaveLogs($batchData, $deviceId, $reportType, $recordedAt);

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
    public function processAndSaveLogs(array $batchData, string $deviceId, string $reportType, string $recordedAt): int
    {
        if (empty($batchData)) {
            return 0;
        }

        $count = 0;

        // 本地 SQLite 模式
        foreach ($batchData as $log) {

            // 強制歸一化時間為當天 00:00:00
            $recordedAt = \Carbon\Carbon::parse($recordedAt)->startOfDay()->toDateTimeString();

            if (empty($log['domain'])) {
                continue;
            }

            if ($reportType === 'schedule_event') {
                // 邏輯：存在就不動（保護已有的 count），不存在才建立（count 設為 0）
                \App\Models\DnsLog::firstOrCreate(
                    [
                        'device_name' => $deviceId,
                        'domain'      => $log['domain'],
                        'recorded_at' => $recordedAt,
                    ],
                    [
                        'count'   => 0, 
                    ]
                );
            } else {
                // 邏輯：每日通報為 Source of Truth，直接更新
                \App\Models\DnsLog::updateOrCreate(
                    [
                        'device_name' => $deviceId,
                        'domain'      => $log['domain'],
                        'recorded_at' => $recordedAt,
                    ],
                    [
                        'count'   => $log['count'],
                    ]
                );
            }
            $count++;
        }

        return $count;
    }
}
