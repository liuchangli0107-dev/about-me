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
        $this->withoutMiddleware();
    
        $response = $this->postJson('/api/dns', [
            'device_id'=> 'iMac-Home',
            'data'=> [
                [
                    'domain' => 'google.com',
                    'status' => 'online',
                    'latency' => 25,
                    'count' => 1
                ]
            ],
        ]);
    
        $response->assertStatus(200);
    }
}
