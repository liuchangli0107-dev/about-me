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
        Schema::table('dns_logs', function (Blueprint $table) {
            // 來自 Olivia 電腦原始的 UUID
            $table->uuid('local_uuid')->nullable()->unique()->after('id');
            // 允許手動寫入建立時間（因為是批次同步，不能只用雲端的系統時間）
            $table->timestamp('recorded_at')->nullable()->after('latency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dns_logs', function (Blueprint $table) {
            //
        });
    }
};
