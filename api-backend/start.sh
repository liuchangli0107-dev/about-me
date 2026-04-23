#!/bin/sh

# 1. 先啟動 PHP-FPM，並加 -D 讓它在背景執行 (Daemonize)
php-fpm -D

# 2. 再啟動 Nginx，並讓它在前台執行 (daemon off)
# 這樣 Cloud Run 才能透過 Nginx 監控容器狀態
nginx -g "daemon off;"