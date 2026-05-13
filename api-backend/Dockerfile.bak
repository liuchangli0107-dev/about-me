FROM php:8.4-fpm

# 1. 移除 gRPC 和 Protobuf 編譯，只裝 Nginx 和基礎 PHP 擴充
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev nginx \
    && docker-php-ext-install pdo pdo_mysql zip

WORKDIR /var/www
COPY . .

# 2. 建立 SQLite 檔案並給予寫入權限 (這是新戰術的核心)
RUN mkdir -p database storage \
    && touch database/database.sqlite \
    && chown -R www-data:www-data /var/www/database /var/www/storage

# 3. 複製設定檔
COPY nginx.conf /etc/nginx/sites-enabled/default
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# 4. 安裝 Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --ignore-platform-reqs --no-dev --no-interaction --prefer-dist --optimize-autoloader

EXPOSE 8080

# 5. 確保 PHP-FPM 與 Nginx 同時啟動
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]