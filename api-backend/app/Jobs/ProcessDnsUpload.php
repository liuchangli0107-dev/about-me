<?php

namespace App\Jobs;

use App\Models\DnsLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessDnsUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // 定義接收的資料
    public function __construct(protected array $data) {}

    public function handle(): void
    {
        $recordedAt = $this->data['timestamp'] ?? now();

        DnsLog::create([
            'local_uuid'  => $this->data['uuid'] ?? null,
            'device_name' => $this->data['device_name'],
            'status'      => $this->data['status'],
            'latency'     => $this->data['latency'],
            'recorded_at' => $recordedAt,
            'created_at'  => now(),
        ]);
    }
}