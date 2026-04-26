<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('dns_logs', function (Blueprint $table) {
            // 增加 count 欄位，預設為 0
            $table->integer('count')->default(0)->after('status');
        });
    }

    public function down()
    {
        Schema::table('dns_logs', function (Blueprint $table) {
            $table->dropColumn('count');
        });
    }
};
