<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DnsUploadTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_dns_upload_with_predefined_keys()
    {
        // 1. 準備測試資料
        $logData = [
            [
                'uuid' => 'test-uuid-123',
                'status' => 'online',
                'latency' => 45,
                'timestamp' => now()->toIso8601String()
            ],
        ];
        $jsonData = json_encode($logData);

        // 2. 讀取現有的公鑰進行加密 (避開 openssl_pkey_new)
        $publicKeyPath = storage_path('app/keys/public.pem');
        if (!file_exists($publicKeyPath)) {
            $this->markTestSkipped('缺少測試公鑰，跳過加密測試');
        }
        
        $publicKey = file_get_contents($publicKeyPath);
        $encrypted = '';
        openssl_public_encrypt($jsonData, $encrypted, $publicKey, OPENSSL_PKCS1_OAEP_PADDING);
        $base64Encrypted = base64_encode($encrypted);

        // 3. 執行請求 (注意路徑已改為 /api/dns)
        $response = $this->postJson('/api/dns', [
            'device_id' => 'iMac-Test-Unit',
            'data' => $base64Encrypted
        ]);

        // 4. 斷言結果
        $response->assertStatus(200)
            ->assertJsonPath('status', '處理成功');
    }
}