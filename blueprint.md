# Project Blueprint: 個人門戶與跨設備監控系統

## 1. 專案概述 (Overview)
本專案是一個整合個人生產力工具（待辦事項、天氣）與遠端設備監控（DNS 延遲偵測）的綜合門戶。支援跨設備加密數據同步與視覺化呈現。

## 2. 當前狀態 (Current State)
- **前端 (React/Vite)**: 
  - 基礎 Todo List 組件已具備 Local Storage 持久化功能。
  - Weather Widget 已建立 placeholder。
  - **新進度**: 已建立 `DnsMonitor.tsx` 並透過 Vite Proxy 連接後端。
- **後端 (Laravel 11)**:
  - 已完成 `dns_logs` 資料庫設計，支援 `recorded_at` 歷史還原。
  - 已部署 RSA-2048 非對稱加密解密邏輯。
  - 異步隊列 (Queue) 已配置完成。

## 3. 開發計畫 (Planned Features)

### 3.1 基礎功能 (原本功能維持)
#### A. Todo List (Local Storage)
- **組件**: `src/components/TodoList.tsx`
- **功能**: 增刪查改、完成狀態切換、本地存儲持久化。

#### B. Weather Widget
- **組件**: `src/components/Weather.tsx`
- **功能**: 串接第三方 API，顯示當前位置天氣情況。

### 3.2 監控系統 (核心新增功能)
#### A. 跨設備數據接收 API
- **目標**: 接收各 Mac 設備傳回的加密監控數據。
- **規格**: POST `/api/upload` (JSON + RSA-OAEP 加密)。
- **安全**: 私鑰存放於雲端，公鑰分發至設備端。

#### B. 設備監控儀表板 (DnsMonitor)
- **組件**: `src/components/DnsMonitor.tsx`
- **功能**: 
  - 顯示設備清單（iMac, Mac mini, Olivia-Macbook）。
  - 即時連線狀態燈號（Online/Offline）。
  - 顯示真實紀錄時間與網路延遲 (ms)。

### 3.3 設備端 Python 腳本 (Pending)
- **目標**: 實現斷網續傳與批次加密同步。
- **關鍵邏輯**:
  - 每 10 秒偵測一次，每 5 筆數據進行一次 RSA 加密打包。
  - 整合 Olivia 的 `schedule` (課表) 邏輯，在課堂時間自動調整偵測頻率。

### 3.4 異常通知系統
- **目標**: 整合 Telegram Bot。
- **功能**: 偵測到 status 為 `offline` 持續超過 5 分鐘時，發送緊急通知給長利兄。