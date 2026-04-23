<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DnsController;

Route::get('/debug-php', function() {
    return response()->json(['status' => 'PHP 8.4 is Alive!']);
});

Route::get('/dns', [DnsController::class, 'index']);
Route::post('/dns', [DnsController::class, 'store']);
