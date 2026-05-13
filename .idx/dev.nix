# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    # 只保留您確定需要的 PHP 擴充，移除 protobuf 如果也沒用到
    (pkgs.php83.withExtensions ({ enabled, all }: enabled ++ [ all.protobuf ]))
    pkgs.php83Packages.composer
    pkgs.openssl
    # 在 Nixpkgs 中，sqlite-interactive 通常就包含 sqlite3 指令
    pkgs.sqlite-interactive
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "google.gemini-cli-vscode-ide-companion"
      "devsense.phptools-vscode"
    ];
    workspace = {
      # 僅在工作區首次建立時執行
      onCreate = {
        npm-install = "npm i --no-audit --no-progress --timing";
        # 1. 建立持久化資料夾
        # 2. 如果資料庫不存在則建立初始檔案
        setup-db = ''
          mkdir -p /home/user/persistent_data
          if [ ! -f /home/user/persistent_data/database.sqlite ]; then
            touch /home/user/persistent_data/database.sqlite
            chmod 666 /home/user/persistent_data/database.sqlite
          fi
        '';
        default.openFiles = [ "src/App.tsx" "api-backend/app/Http/Controllers/TelegramWebhookController.php" ];
      };
      
      # 每次啟動工作區時執行 (關鍵在於確保連結正確)
      onStart = {
        # 💡 使用軟連結 (Symlink) 將專案目錄與持久化目錄連起來
        # 這樣 Laravel 讀取路徑不變，但實體儲存在安全區
        link-db = "ln -sf /home/user/persistent_data/database.sqlite /home/user/about-me/api-backend/database/database.sqlite";
        
        api-backend = "cd api-backend && php artisan serve --port=8000";
      };
    };
    # Enable previews and customize ports
    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0" ];
          manager = "web";
        };
        api = {
          command = [ "sh" "-c" "cd api-backend && php artisan serve --port=8000" ];
          manager = "web";
        };
      };
    };
  };
}
