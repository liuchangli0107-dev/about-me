<?php

namespace Tests\Feature;

use App\Http\Controllers\Api\DnsController;
use App\Models\DnsLog;
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
            ],
            [
                'domain' => 'cloudflare.com',
                'status' => 'online',
                'latency' => 15,
            ],
        ];

        // 2. Instantiate the controller directly
        $controller = new DnsController();

        // 3. Call the core logic method
        $processedCount = $controller->processAndSaveLogs($logData, $deviceId);

        // 4. Assert the results based on the database connection
        $dbConnection = env('DB_CONNECTION');

        if ($dbConnection === 'sqlite') {
            // For SQLite, we directly verify the database content,
            // using Eloquent queries to avoid potential keyword conflicts
            // with helpers like assertDatabaseHas.
            $this->assertEquals(2, $processedCount);

            $log1 = DnsLog::where('device_name', $deviceId)
                          ->where('domain', 'google.com')
                          ->first();
            
            $this->assertNotNull($log1, "Log for google.com not found.");
            $this->assertEquals('online', $log1->status);
            $this->assertEquals(20, $log1->latency);

            $log2 = DnsLog::where('device_name', $deviceId)
                          ->where('domain', 'cloudflare.com')
                          ->first();

            $this->assertNotNull($log2, "Log for cloudflare.com not found.");
            $this->assertEquals('online', $log2->status);
            $this->assertEquals(15, $log2->latency);

        } else {
            // For other connections (like firestore), we trust the returned count
            $this->assertGreaterThan(0, $processedCount, "The method should report that it processed entries.");
            $this->assertEquals(count($logData), $processedCount);
        }
    }
}
