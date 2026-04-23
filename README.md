# iMac DNS Monitoring Dashboard (Backend & API)

這是一個基於 **Laravel 11** 與 **React (Vite)** 開發的全棧監控系統，部署於 **Google Cloud Run**。專為接收與呈現多台遠端設備（如 iMac, MacBook）的 DNS 流量分析而設計。



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

---

### 🚀 如何僅更新 README 並推送到 GitHub？

請在您的 `about-me` 目錄執行以下指令：

```bash
# 1. 將修改後的 README.md 加入暫存
git add README.md

# 2. 提交變更 (註明更新專案說明)
git commit -m "docs: update README with architecture details and Cloud Run deployment info"

# 3. 推送到 GitHub (使用您剛才產生的 ghp_... Token 連結)
git push origin main
```
