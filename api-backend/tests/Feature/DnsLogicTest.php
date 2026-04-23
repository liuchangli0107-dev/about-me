<?php

namespace Tests\Feature;

use App\Http\Controllers\Api\DnsController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DnsLogicTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the core business logic of processing and saving DNS logs.
     * This test bypasses all encryption and network layers.
     */
    public function test_process_and_save_logs_logic(): void
    {
        // 1. Prepare fake, unencrypted data
        $deviceId = 'test-logic-device';
        $logData = [
            [
                'domain' => 'google.com',
                'status' => 'online',
                'latency' => 20,
                'timestamp' => now()->toIso8601String(),
            ],
            [
                'domain' => 'cloudflare.com',
                'status' => 'online',
                'latency' => 15,
                'timestamp' => now()->toIso8601String(),
            ],
        ];

        // 2. Instantiate the controller directly
        $controller = new DnsController();

        // 3. Call the core logic method
        $processedCount = $controller->processAndSaveLogs($logData, $deviceId);

        // 4. Assert the results based on the database connection
        $dbConnection = env('DB_CONNECTION');

        if ($dbConnection === 'sqlite') {
            // For SQLite, we can directly verify the database content
            $this->assertEquals(2, $processedCount);
            $this->assertDatabaseHas('dns_logs', [
                'device_name' => $deviceId,
                'domain' => 'google.com',
                'latency' => 20,
            ]);
            $this->assertDatabaseHas('dns_logs', [
                'device_name' => $deviceId,
                'domain' => 'cloudflare.com',
                'latency' => 15,
            ]);
        } else {
            // For other connections (like firestore), we trust the returned count
            $this->assertGreaterThan(0, $processedCount, "The method should report that it processed entries.");
            $this->assertEquals(count($logData), $processedCount);
        }
    }
}
