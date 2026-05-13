FROM php:8.3-fpm

# 1. 補上 SQLite 依賴，並安裝 pdo_sqlite (對齊 8.3 環境)
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev nginx sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite pdo_mysql zip

WORKDIR /var/www
COPY . .

# 2. 建立 SQLite 檔案並給予寫入權限 (改用絕對路徑防呆)
RUN rm -rf /var/www/database/database.sqlite \
    && mkdir -p /var/www/database /var/www/storage /var/www/bootstrap/cache \
    && touch /var/www/database/database.sqlite \
    && chown -R www-data:www-data /var/www/database /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/database /var/www/storage /var/www/bootstrap/cache

# 3. 複製設定檔 (請確認您的 nginx.conf 是 listen 8080)
COPY nginx.conf /etc/nginx/sites-enabled/default

# 4. 安裝 Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --ignore-platform-reqs --no-dev --no-interaction --prefer-dist --optimize-autoloader

EXPOSE 8080

# 5. 確保 PHP-FPM 與 Nginx 同時啟動
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]