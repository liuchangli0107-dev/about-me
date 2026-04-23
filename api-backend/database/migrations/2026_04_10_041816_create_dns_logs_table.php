<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dns_logs', function (Blueprint $table) {
            $table->id();
            $table->string('device_name'); // iMac-5K, Mac-mini-1
            $table->string('status');      // online, offline
            $table->integer('latency')->nullable(); 
            $table->timestamps();          // 這會自動記錄收到數據的精確時間
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dns_logs');
    }
};
