<?php

// Force Firestore to use REST transport
putenv('GOOGLE_CLOUD_PROJECT=about-me-90967468-c73aa');
putenv('GOOGLE_CLOUD_PHP_GRPC_FOR_FIRESTORE=false');
putenv('GPB_METADATA_CONF_SKIP_GRPC_CHECK=1');

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Laravel 11 排除 CSRF 的正確語法
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();