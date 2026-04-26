# DNS Monitor & Family Protector 🛡️

這是一套基於 macOS (iMac-Server) 運作的家庭 DNS 監控系統。透過 **CoreDNS** 攔截請求，並結合 **Python** 背景監控腳本與 **Telegram Bot**，實現 24/7 的流量監測、設備自動識別與每日統計通報。從即時攔截到週期性的統計報表，形成了一個封閉且具備自我修復能力的環環相扣體系。

三層防線的技術需求與運作邏輯：

---

### 🛡️ 全自動 DNS 守護系統架構

#### 第一層：Chrome 擴充套件 (即時哨兵)
**核心需求：** 針對「極敏感」或「特定網站」的即時監控。
* **動作：** 當瀏覽器發起請求時，擴充套件第一時間捕捉網域。
* **通知機制：** 透過 Telegram Bot API 立即推播訊息。
* **優點：** **零延遲**。適合用於偵測孩子是否打開了受限網站，或是需要第一時間知道的關鍵存取。
* **技術點：** 使用 `chrome.webRequest` 或 `declarativeNetRequest` 攔截。

#### 第二層：Python 日誌攔截 (數據地基)
**核心需求：** 默默守護，確保「凡走過必留下痕跡」。
* **動作：** Python 腳本（如之前的 `dns_monitor.py`）持續監聽網路接口或與 DNS 服務器對接。
* **存儲：** 將原始請求（Domain, Timestamp, Client IP）寫入 **`dns_logs`** 原始數據表。
* **優點：** **全面性**。不限於瀏覽器（如 Line、Spotify、Docker 更新等流量都能捕捉）。

#### 第三層：Python 自動化調度與分析 (智能管家)
**核心需求：** 將大數據轉化為可閱讀的「課表式報表」。
* **動作：** `scheduler.py` 根據課表（如：數理資優、Legal Debate）定時啟動。
* **分析：** `analyzer.py` 讀取 DB，過濾掉白名單與背景雜訊，統計 Top 20 網域。
* **通知與同步：**
    * **TG 通報：** 發送該時段的圓餅圖/長條圖報表。
    * **雲端同步：** 將數據推送到 Google Cloud Run 的 API 後端。
* **狀態防禦：** 實作 `schedule_status` (0/1/2)，具備 **20 分鐘超時自動補發** 與 **重複發報攔截** 功能。

---

### 🚀 後續優化方向 

1.  **儀表板整合**：將 Cloud Run 的 API 數據對接 React 面板，實現「一眼看全家」。
2.  **異常警報 (Anomaly Detection)**：如果某時段出現大量未見過的國外網域，自動發送「紅字警告」。
3.  **自動化清理**：加入 Artifact Registry 清理，降低雲端成本。

---

## 🚀 系統核心特性

* **Serverless 架構**: 部署於 Google Cloud Run，具備自動擴展能力，並透過 Dockerfile 進行環境標準化。
* **自癒式 SQLite 初始化**: 針對 Cloud Run 的唯讀特性設計，啟動時會自動偵測並初始化 `/tmp/database.sqlite` 檔案與資料表架構。
* **RSA 安全傳輸**: 接收端具備 RSA 2048-bit 驗證機制，確保數據從 Python Agent 傳輸至 API 過程中的安全性。
* **數據歸類 (Domain Grouping)**: 支援將雜亂的網域請求自動歸類為 **GitHub**、**Firebase**、**GoogleCloud** 等邏輯群組。
* **多設備即時面板**: 透過 `MAX(recorded_at)` 邏輯，即時呈現每台設備最新的連線狀態與流量排行。

## 🏗️ 技術棧

* **Backend**: Laravel 11 (PHP 8.3)
* **Frontend**: React 18 + TypeScript + Tailwind CSS
* **Database**: SQLite
* **Cloud**: Google Cloud Run / Artifact Registry

## 🛰️ 整合架構 (System Architecture)

本專案作為數據中樞，接收來自各個設備端 Agent 的數據：
* **Agent (採集端)**: [liuchangli0107-dev/dns-monitor](https://github.com/liuchangli0107-dev/dns-monitor)
* **Dashboard (呈現端)**: 即本專案之後端 API 與前端 UI。



## 🛠️ 開發與部署

### 部署至 Cloud Run (範例)
```bash
gcloud run deploy about-me \
  --source . \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated \
  --set-env-vars="DB_CONNECTION=sqlite"
```

## 📝 最近更新
* **2026-04-23**: 
    * 完成 Firebase 依賴清理，全面轉向 Cloud Run API 架構。
    * 修正 `recorded_at` 與 `count` 欄位對齊邏輯。
    * 優化 `DnsController` 的自癒式資料表建立流程。
