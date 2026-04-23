# 專案背景：跨設備網路狀態監控系統 (Dns-Monitor)

## 1. 核心目標
監控分佈於各地的設備（iMac 5K, Mac mini, Olivia-Macbook）之網路連線品質（Ping 延遲），並透過雲端 Laravel 後端進行數據彙整與前端視覺化呈現。

## 2. 技術棧 (Stack)
- **後端**: Laravel 11 (PHP 8.3), SQLite, Laravel Queue (Database Driver)
- **前端**: React + Vite (使用 Tailwind CSS)
- **設備端**: Python 監控腳本 (批次同步模式)
- **開發環境**: Google IDX

## 3. 安全通訊協定 (Security)
採用 **RSA-2048 非對稱加密**：
- **私鑰 (Private Key)**: 儲存於雲端 `storage/app/keys/private.pem`。用於解密數據。
- **公鑰 (Public Key)**: 儲存於各設備端 `config.json`。用於加密 JSON 數據。
- **認證流程**: 設備端將 JSON 陣列加密後，轉換為 Base64 字串，透過 POST `data` 欄位傳送。

## 4. 資料庫與數據邏輯
### 關鍵欄位 (Table: dns_logs)
- `local_uuid`: 設備端生成的唯一碼，防止重複同步。
- `device_name`: 設備識別 (如: Olivia-Macbook)。
- `status`: 連線狀態 (online/offline)。
- `latency`: 延遲毫秒數。
- `recorded_at`: **重要**。設備端真實記錄時間，用於還原歷史軌跡。
- `created_at`: 雲端伺服器入庫時間。

## 5. 已完成進度 (Milestones)
- [x] 生成 RSA 公私鑰對，並完成目錄結構保護。
- [x] 建立 `DnsController@store`：支援 Base64 解密與批次 Job 派發。
- [x] 建立 `ProcessDnsUpload` Job：處理非同步寫入資料庫。
- [x] 修正 `DnsLog` Model：補齊 `recorded_at` 之 Fillable 權限。
- [x] 前端 `DnsMonitor.tsx`：完成 React 組件開發與 Vite Proxy (/api) 設定。

## 6. 待辦事項 (Pending)
- [ ] 撰寫支援 RSA 加密的 Python 批次同步腳本。
- [ ] 整合 Olivia 的 `schedule` (課表) 邏輯至監控頻率中。
- [ ] 部署至 GCP (Google Cloud Platform)。
- [ ] 整合 Telegram Bot 異常通知。