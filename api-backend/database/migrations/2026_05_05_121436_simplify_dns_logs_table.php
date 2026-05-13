<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * 執行遷移
     */
    public function up(): void
    {
        // 1. 檢查並刪除索引 (使用 Raw SQL 因為 Schema 沒有 hasIndex)
        $indexExists = DB::connection()->select(
            "SELECT name FROM sqlite_master WHERE type='index' AND name='dns_logs_local_uuid_unique'"
        );

        if (!empty($indexExists)) {
            Schema::table('dns_logs', function (Blueprint $table) {
                $table->dropUnique(['local_uuid']);
            });
        }

        // 2. 檢查並刪除欄位
        Schema::table('dns_logs', function (Blueprint $table) {
            $cols = ['latency', 'local_uuid', 'status'];
            foreach ($cols as $col) {
                if (Schema::hasColumn('dns_logs', $col)) {
                    $table->dropColumn($col);
                }
            }
            
            // 保持您明智的決定：維持 datetime 格式
            $table->dateTime('recorded_at')->change();
        });

        // 3. 建立新的複合索引 (建議給個名字，避免自動生成太長)
        Schema::table('dns_logs', function (Blueprint $table) {
            $table->index(['device_name', 'domain', 'recorded_at'], 'idx_device_domain_time');
        });
    }

    /**
     * 還原遷移 (當需要回滾時)
     */
    public function down(): void
    {
        Schema::table('dns_logs', function (Blueprint $table) {
            $table->integer('latency')->nullable();
            $table->string('local_uuid')->nullable();
            $table->string('status')->nullable();
        });
    }
};