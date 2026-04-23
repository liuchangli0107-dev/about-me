<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DnsLog extends Model
{
    protected $fillable = [
        'device_name', 
        'status', 
        'latency', 
        'local_uuid', 
        'recorded_at',
        'created_at'
    ];
}
