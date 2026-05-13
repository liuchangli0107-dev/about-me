<?php

namespace Tests\Feature;

use App\Http\Controllers\Api\DnsController;
use App\Models\DnsLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;

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
        $recordedAt = Carbon::now()->toDateTimeString();
        $logData = [
            [
                'domain' => 'google.com',
                'count' => 120,
            ],
            [
                'domain' => 'cloudflare.com',
                'count' => 85,
            ],
        ];

        // 2. Instantiate the controller directly
        $controller = new DnsController();

        // 3. Call the core logic method
        $processedCount = $controller->processAndSaveLogs($logData, $deviceId, 'daily_report', $recordedAt);

        // 4. Assert the results based on the database connection
        $dbConnection = env('DB_CONNECTION');

        if ($dbConnection === 'sqlite') {
            // For SQLite, we directly verify the database content.
            $this->assertEquals(2, $processedCount);

            $log1 = DnsLog::where('device_name', $deviceId)
                          ->where('domain', 'google.com')
                          ->first();
            
            $this->assertNotNull($log1, "Log for google.com not found.");
            $this->assertEquals(120, $log1->count);

            $log2 = DnsLog::where('device_name', $deviceId)
                          ->where('domain', 'cloudflare.com')
                          ->first();

            $this->assertNotNull($log2, "Log for cloudflare.com not found.");
            $this->assertEquals(85, $log2->count);

        } else {
            // For other connections (like firestore), we trust the returned count
            $this->assertGreaterThan(0, $processedCount, "The method should report that it processed entries.");
            $this->assertEquals(count($logData), $processedCount);
        }
    }
}
