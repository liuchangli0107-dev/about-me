<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DnsLog extends Model
{
    protected $table = 'dns_logs';

    protected $fillable = [
        'device_name', 
        'domain',
        'count',       // 統計次數
        'recorded_at', // 格式：Y-M-D
    ];

    // 因為統計通常不需要頻繁更新 updated_at，若想節省空間可考慮關閉
    // public $timestamps = true;
}
