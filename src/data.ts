import { FileText, Zap, CheckCircle2 } from 'lucide-react';
import type { Experience, Education, Philosophy, Framework } from './types';

export const experiences: Experience[] = [
  {
    company: '異奇網股份有限公司',
    role: '網頁工程師',
    period: '2011/12 - 2013/12',
    description: '這是我第一份網路相關工作，公司營運業務為客製化APP為主，同時提供用戶網頁與APP(Android與iOS)，其中包含 華人星光大道2 的歌手APP與大量的婚禮和店家APP。現在如果使用AI開發稍微懂一點的人都可以嘗試，但是當時對非工程師來說程式碼如同無字天書。',
    tags: []
  },
  {
    company: '新加坡商葆光資訊 (uitox)',
    role: 'ERP 後端工程師',
    period: '2013/12 - 2017/01',
    description: '這是我第一份大型購物平台的工作，參與 ASAP 閃電購物、跨境電商（天貓、飛牛網）之 ERP 系統整合。工作內容涵蓋訂單流、倉儲管理、財務對帳及 PDA 行動裝置介面。系統賣給華碩後，完成交接並協助華碩系統的早期除錯與修復。',
    tags: ['Oracle', 'RabbitMQ', '國泰世華 API']
  },
  {
    company: '星羅顧問 / 光曳資訊',
    role: '高階 PHP 工程師',
    period: '2017/03 - 2022/03',
    description: '光曳資訊幫其他公司開發後台系統，使用 CodeIgniter 3 結合 Gearman 處理統計數據，並透過 WebSocket 實現即時告警。因為想學習體彩的模型離開光曳資訊3個月，一個可以把真實世界的因素數據化的技術，對一個學統計的人而言，實在太誘人了。但是發現所謂的自建模型其實是參考其他網站的結果後，立馬回到光曳資訊。最後的一年，星羅顧問整併了光曳資訊，因為星羅使用Laravel，所以累積了短暫的Laravel經驗。',
    tags: ['CodeIgniter', 'Laravel', 'Gearman', 'WebSocket', 'SSE']
  },
  {
    company: '神樂科技有限公司',
    role: '資深後端工程師',
    period: '2022/07 - 2025/12',
    description: '負責開發與維護加密貨幣交易所延伸業務，包含開發多功能的 Telegram Bot 應用（含錢包、記帳、抽獎及其他自動化管理功能），用戶端利用類似空投(幣安等交易所常用的做法)吸引新用戶與增加用戶的黏著度，後台部分提供營運人員 Telegram 即時通知與操作。',
    tags: ['Symfony', 'Phalcon', 'ThinkPHP', 'RabbitMQ', 'Telegram API']
  }
];

export const education: Education = {
  degree: '國立中興大學 農藝系生物統計組 | 碩士',
  institution: '國立中興大學',
  period: '2004/09 – 2007/01',
  description: '專長數據建模與統計分析。碩士論文應用 PLSR 模型進行稻米產量預測，培養嚴謹的邏輯思維與資料處理直覺。為了加強資料庫技能，2011年9月參加了職訓局委託中華數位舉辦的網際網路資料庫設計班，受訓期間學習 C、PHP、MySQL、Dreamwaver、Photoshop、Flash及Linux(Fedora與CentOS)架站，也嘗試使用另一個作業系統Ubuntu(Linux)。分組專題中分到的工作大部份是資料庫(MySQL)的建構與運用，開始進入網頁工程師的世界。'
};

export const philosophies: Philosophy[] = [
  {
    title: '結構化思維',
    description: '我主張「以優良的資料結構解決複雜需求」，在開發初期即考量系統的擴充性與穩定性，減少後續維護成本。',
    icon: FileText
  },
  {
    title: '文件化溝通',
    description: '在遠端環境中，我堅持依循規格書施工並產出清晰的技術文檔，確保團隊資訊同步。',
    icon: Zap
  },
  {
    title: '穩定性與責任',
    description: '基於接送小孩與參與孩子教育的穩定生活需求，我尋求長期的技術深耕機會。這份家庭責任轉化為我在工作上極高的穩定度與對產出時間的精準掌控。',
    icon: CheckCircle2
  }
];

export const frameworks: Framework[] = [
    { name: 'React', description: '前端開發框架', icon: 'react' },
    { name: 'TypeScript', description: 'JavaScript 的超集合', icon: 'typescript' },
    { name: 'Firebase', description: '後端即服務平台', icon: 'firebase' },
    { name: 'Google Cloud', description: '雲端運算服務', icon: 'google-cloud' },
    { name: 'Docker', description: '容器化平台', icon: 'docker' },
    { name: 'Git', description: '版本控制系統', icon: 'git' },
    { name: 'PHP', description: '後端開發語言', icon: 'php' },
    { name: 'Laravel', description: 'PHP 開發框架', icon: 'laravel' },
    { name: 'Symfony', description: 'PHP 開發框架', icon: 'symfony' },
    { name: 'CodeIgniter', description: 'PHP 開發框架', icon: 'codeigniter' },
    { name: 'RabbitMQ', description: '訊息佇列', icon: 'rabbitmq' },
    { name: 'MySQL', description: '關聯式資料庫', icon: 'mysql' },
    { name: 'Oracle', description: '關聯式資料庫', icon: 'oracle' }
];
