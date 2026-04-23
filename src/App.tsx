import React, { useState } from 'react';
import {
  Globe,
  Github,
  Mail,
  Phone,
  GraduationCap,
  Menu,
  X,
  Code,
  Zap, 
  BrainCircuit, 
  Briefcase
} from 'lucide-react';
import profileImage from './assets/profile.jpg';
import { experiences, education, philosophies, frameworks } from './data';
import ExperienceCard from './components/ExperienceCard';
import TodoList from './components/TodoList';
import DnsMonitor from './components/DnsMonitor';
import Icon from './components/Icon';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <section id="about" className="pt-32 pb-20 px-6 bg-slate-900">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-full h-full bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-transparent rounded-3xl blur-2xl opacity-60"></div>
                <img
                  src={profileImage}
                  alt="劉長利"
                  className="relative rounded-3xl shadow-2xl shadow-sky-900/50 w-80 md:w-96"
                />
              </div>
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-sm font-bold mb-6">
                  14+ Years Backend Engineer
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8 text-slate-100">
                  劉長利 <br />
                  <span className="text-sky-400">資深 PHP 工程師</span>
                </h1>
                <div className="space-y-6 text-slate-400 text-lg">
                  <div className="flex gap-4">
                      <div className="flex-shrink-0 text-sky-400 mt-1"><Zap size={20} /></div>
                      <div>
                          <h3 className="font-bold text-slate-200 mb-1">核心技術與領域</h3>
                          <p>熟悉 PHP 生態系，具備處理高併發 API、ERP 系統與金融帳務系統的經驗。深刻理解電商 ERP 核心架構（倉儲、對帳、物流）與加密貨幣交易所業務（錢包、分潤、推播）。</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="flex-shrink-0 text-sky-400 mt-1"><BrainCircuit size={20} /></div>
                      <div>
                          <h3 className="font-bold text-slate-200 mb-1">AI 協作與全方位開發</h3>
                          <p>AI 的介入正重塑開發流程。我已進化為具備 PM 思維、全端開發與系統維護的『全方位戰力』，利用 AI 將重心從繁瑣的編碼轉向更高層次的架構設計與業務邏輯優化，從而縮短開發週期，精準回應業務需求。</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="flex-shrink-0 text-sky-400 mt-1"><Briefcase size={20} /></div>
                      <div>
                          <h3 className="font-bold text-slate-200 mb-1">工作模式與期望</h3>
                          <p>具備純熟的遠端工作能力，能維持穩定且高品質的技術產出。為兼顧家庭，期望找到一份以高效成果為導向、取代傳統固定打卡的彈性工作。</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 'skills':
        return (
          <section id="skills" className="py-20 bg-slate-900/70 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-slate-100">框架與技術</h2>
                <p className="text-slate-400">後端框架、資料庫與其他技術</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {frameworks.map((framework) => (
                    <div key={framework.name} className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-900/50 transition-all">
                        <Icon name={framework.icon} className="w-12 h-12 mb-4 text-sky-400" />
                        <h3 className="text-lg font-bold mb-2 text-slate-200">{framework.name}</h3>
                        <p className="text-sm text-slate-400 text-center">{framework.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'experience':
        return (
          <section id="experience" className="py-20 px-6 bg-slate-900">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-slate-100">工作經歷</h2>
                <p className="text-slate-400">專注於金融、電商與自動化系統開發</p>
              </div>
              <div className="space-y-12">
                {experiences.map((exp, idx) => (
                  <ExperienceCard key={idx} experience={exp} />
                ))}
              </div>
            </div>
          </section>
        );
      case 'philosophy':
        return (
          <section id="philosophy" className="pt-32 pb-20 px-6 bg-slate-900/70 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              {/* Left side: Education */}
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-100">
                  <GraduationCap className="mr-3 text-sky-400" size={28} />
                  <span>【教育背景】</span>
                </h3>
                <div>
                  <h4 className="font-bold text-slate-200 text-lg">{education.degree}</h4>
                  <p className="text-sm text-slate-400 font-mono mb-4">({education.period})</p>
                  <p className="text-slate-400 leading-relaxed">
                    {education.description}
                  </p>
                </div>
              </div>

              {/* Right side: Philosophy */}
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-100">
                  <Globe className="mr-3 text-sky-400" size={28} />
                  <span>【理念與價值】</span>
                </h3>
                <div className="space-y-6">
                  {philosophies.map((philosophy, idx) => {
                    const Icon = philosophy.icon;
                    return (
                      <div className="flex gap-4" key={idx}>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-slate-200">{philosophy.title}</h4>
                          <p className="text-sm text-slate-400">{philosophy.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      case 'todo':
        return <TodoList />;
      case 'dns-monitor':
        return <DnsMonitor />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-sky-500/20 selection:text-sky-300">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            <Code />
            <span>劉長利</span>
          </div>
          <div className="hidden md:flex space-x-8 font-medium text-slate-300">
            <button onClick={() => handleTabClick('about')} className={`hover:text-sky-400 transition-colors ${activeTab === 'about' ? 'text-sky-400' : ''}`}>關於我</button>
            <button onClick={() => handleTabClick('skills')} className={`hover:text-sky-400 transition-colors ${activeTab === 'skills' ? 'text-sky-400' : ''}`}>框架與技術</button>
            <button onClick={() => handleTabClick('experience')} className={`hover:text-sky-400 transition-colors ${activeTab === 'experience' ? 'text-sky-400' : ''}`}>工作經歷</button>
            <button onClick={() => handleTabClick('philosophy')} className={`hover:text-sky-400 transition-colors ${activeTab === 'philosophy' ? 'text-sky-400' : ''}`}>背景與理念</button>
            <button onClick={() => handleTabClick('todo')} className={`hover:text-sky-400 transition-colors ${activeTab === 'todo' ? 'text-sky-400' : ''}`}>待辦事項</button>
            <button onClick={() => handleTabClick('dns-monitor')} className={`hover:text-sky-400 transition-colors ${activeTab === 'dns-monitor' ? 'text-sky-400' : ''}`}>DNS 狀態</button>
          </div>
          <div className="flex items-center">
            <a href="mailto:liuchangli0107@gmail.com" className="hidden md:block bg-sky-500 text-slate-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-sky-400 transition-all shadow-sm shadow-sky-900/40">
              聯繫我
            </a>
            <button
              className="md:hidden ml-4 text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/80 backdrop-blur-md">
            <div className="px-6 pb-4 flex flex-col space-y-4 text-slate-300">
              <button onClick={() => handleTabClick('about')} className={`text-left hover:text-sky-400 transition-colors ${activeTab === 'about' ? 'text-sky-400' : ''}`}>關於我</button>
              <button onClick={() => handleTabClick('skills')} className={`text-left hover:text-sky-400 transition-colors ${activeTab === 'skills' ? 'text-sky-400' : ''}`}>框架與技術</button>
              <button onClick={() => handleTabClick('experience')} className={`text-left hover:text-sky-400 transition-colors ${activeTab === 'experience' ? 'text-sky-400' : ''}`}>工作經歷</button>
              <button onClick={() => handleTabClick('philosophy')} className={`text-left hover:text-sky-400 transition-colors ${activeTab === 'philosophy' ? 'text-sky-400' : ''}`}>背景與理念</button>
              <button onClick={() => handleTabClick('todo')} className={`text-left hover:text-sky-400 transition-colors ${activeTab === 'todo' ? 'text-sky-400' : ''}`}>待辦事項</button>
              <button onClick={() => handleTabClick('dns-monitor')} className={`text-left hover:text-sky-400 transition-colors ${activeTab === 'dns-monitor' ? 'text-sky-400' : ''}`}>DNS 狀態</button>
              <a href="mailto:liuchangli0107@gmail.com" className="bg-sky-500 text-slate-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-sky-400 transition-all shadow-sm text-center shadow-sky-900/40">
                聯繫我
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-700 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="mailto:liuchangli0107@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full hover:border-sky-500/50 transition-colors">
              <Mail className="text-sky-400" size={20} />
              <span className="font-medium text-slate-300">liuchangli0107@gmail.com</span>
            </a>
            <a href="tel:0928323276" className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full hover:border-sky-500/50 transition-colors">
              <Phone className="text-sky-400" size={20} />
              <span className="font-medium text-slate-300 font-mono">0928-323-276</span>
            </a>
            <a href="https://github.com/charlieliu" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-all">
              <Github size={20} className="text-slate-300" />
              <span className="font-medium text-slate-400">charlieliu</span>
            </a>
            <a href="https://github.com/liuchangli0107-dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-all">
              <Github size={20} className="text-slate-300" />
              <span className="font-medium text-slate-400">liuchangli0107-dev</span>
            </a>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Charlie Liu. Built with Structured Logic & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
