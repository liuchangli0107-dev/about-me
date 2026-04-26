import React, { useEffect, useState } from 'react';
import TimeAgo from './TimeAgo'; // 匯入 TimeAgo 元件

interface DeviceStatus {
  device_name: string;
  status: string;
  latency: number | null;
  recorded_at: string;
}

// 定義存儲在 localStorage 中的資料結構
interface TokenData {
  token: string;
  timestamp: number;
}

const DnsMonitor: React.FC = () => {
  const [statuses, setStatuses] = useState<DeviceStatus[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. 初始化檢查：檢查 Token 是否有效且未過期
  useEffect(() => {
    const savedDataString = localStorage.getItem('monitor_token_data');
    if (savedDataString) {
      try {
        const savedData: TokenData = JSON.parse(savedDataString);
        const oneHour = 60 * 60 * 1000; // 1 小時的毫秒數

        // 檢查時間戳是否已過期
        if (Date.now() - savedData.timestamp > oneHour) {
          console.log("Token 已過期，請重新登入");
          localStorage.removeItem('monitor_token_data');
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (e) {
        // 如果解析出錯，也清除舊資料
        localStorage.removeItem('monitor_token_data');
      }
    }
    // 如果沒有 savedDataString，isLoading 保持 true，直到 fetchStatus 完成
  }, []);

  const fetchStatus = async () => {
    setIsLoading(true);
    const savedDataString = localStorage.getItem('monitor_token_data');
    const token = savedDataString ? (JSON.parse(savedDataString) as TokenData).token : '';
    
    try {
      const response = await fetch('/api/dns', {
        headers: {
          'X-Monitor-Token': token,
          'Accept': 'application/json'
        }
      });

      if (response.status === 405) {
        console.error("DNS Monitor 獲取失敗", response);
        return;
      }

      if (response.status === 401) {
        handleLogout(); // Token 失效或錯誤，強制登出
        return;
      }

      const data = await response.json();
      setStatuses(data);
    } catch (error) {
      console.error("DNS Monitor 獲取失敗", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. 登入後啟動輪詢
  useEffect(() => {
    if (isLoggedIn) {
      fetchStatus();
      const timer = setInterval(fetchStatus, 10000);
      return () => clearInterval(timer);
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      const tokenData: TokenData = {
        token: password,
        timestamp: Date.now()
      };
      localStorage.setItem('monitor_token_data', JSON.stringify(tokenData));
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('請輸入有效的訪問暗號');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('monitor_token_data');
    setIsLoggedIn(false);
    setStatuses([]);
    setPassword('');
    setIsLoading(true);
  };

  // --- 登入介面 ---
  if (!isLoggedIn) {
    return (
      <div className="my-6 p-8 bg-slate-900 border border-slate-700 rounded-2xl text-center shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-4">
          <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">監控系統已鎖定</h2>
        <p className="text-slate-400 text-sm mb-6">請輸入 X-Monitor-Token 以解鎖數據</p>
        
        <form onSubmit={handleLogin} className="max-w-xs mx-auto">
          <input 
            type="password" 
            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all mb-3 text-center"
            placeholder="輸入訪問暗號..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg transition-colors">
            確認解鎖
          </button>
        </form>
      </div>
    );
  }

  // --- 數據面版 ---
  return (
    <div className="my-6 p-6 bg-slate-900/50 border border-slate-700 rounded-2xl backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span className="flex h-3 w-3 mt-1">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          系統網路狀態
        </h2>
        <button 
          onClick={handleLogout}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          登出系統
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-4 text-slate-500 text-sm italic">
            正在獲取安全數據中...
          </div>
        ) : statuses.length > 0 ? statuses.map((device) => (
          <div key={device.device_name} className="group p-4 bg-slate-800/50 border border-slate-700 hover:border-sky-500/50 transition-all rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="text-slate-200 font-medium">{device.device_name}</span>
              <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                device.status === 'online' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {device.status}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-mono font-light text-slate-100">
                {device.latency ?? '--'}<span className="text-xs text-slate-500 ml-1">ms</span>
              </span>
              <TimeAgo timestamp={device.recorded_at} />
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-4 text-slate-500 text-sm italic">
            暫無數據，或所有監控裝置皆離線。
          </div>
        )}
      </div>
    </div>
  );
};

export default DnsMonitor;
