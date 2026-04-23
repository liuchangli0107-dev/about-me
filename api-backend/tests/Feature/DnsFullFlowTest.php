<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\DnsLog;

class DnsFullFlowTest extends TestCase
{
    // 注意：如果是測 Firestore，請暫時把這行註解掉，改用 SQLite 測邏輯
    use RefreshDatabase;

    /** @test */
    public function test_store_and_then_index_flow()
    {
        // 1. 手動模擬 store 寫入 (跳過加密，直接存入，測試 DB 寫入與 Token)
        $testDeviceId = 'iMac-Test-Flow';
        $testToken = env('MONITOR_VIEW_TOKEN') ?? 'test-token-123';

        // 直接調用 Model 寫入，確保 DB 連線是通的
        DnsLog::create([
            'device_name' => $testDeviceId,
            'status' => 'online',
            'recorded_at' => now()->toIso8601String(),
            'local_timestamp' => now()->toIso8601String(), // 同時寫入兩個可能欄位
        ]);

        // 2. 模擬前端 index 讀取 (帶上 Token)
        $response = $this->withHeaders([
            'X-Monitor-Token' => $testToken,
        ])->getJson('/api/dns');

        // 3. 診斷回傳結果
        $response->assertStatus(200);
        
        $data = $response->json();
        
        // 關鍵檢查：回傳的 Array 是否有剛才那一筆？
        $this->assertNotEmpty($data, 'API 回傳資料為空，這就是網頁沒數據的原因！');
        $this->assertEquals($testDeviceId, $data[0]['device_name']);
    }
}