import React, { useState } from 'react';
import {
  Database,
  Globe,
  Github,
  Mail,
  Phone,
  CheckCircle2,
  Layout,
  Server,
  GraduationCap
} from 'lucide-react';
import profileImage from './assets/profile.jpg';
import { experiences, education, philosophies } from './data';
import ExperienceCard from './components/ExperienceCard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <section id="about" className="pt-32 pb-20 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-full h-full bg-gradient-to-br from-blue-200 via-indigo-200 to-transparent rounded-3xl blur-2xl opacity-60"></div>
                <img
                  src={profileImage}
                  alt="劉長利"
                  className="relative rounded-3xl shadow-xl w-80 md:w-96"
                />
              </div>
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
                  14+ Years Backend Engineer
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                  劉長利 <br />
                  <span className="text-blue-600">資深 PHP 工程師</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  熟悉 PHP 生態系，具備處理高併發 API、 ERP 系統與金融帳務系統的經驗。理解電商 ERP 核心架構（倉儲、對帳、物流）與加密貨幣交易所業務（錢包應用、手續費分潤、用戶黏著度、即時推播）。熱衷技術傳承，具備將複雜邏輯轉化為簡明文件與程式碼的能力。堅持「規格先行」與「結構優化」，確保在遠端模式下仍有穩定且高品質的技術產出。為兼顧家庭照顧與教育需求，期望找到一份以高效工作模式取代固定打卡的工作。
                </p>
              </div>
            </div>
          </section>
        );
      case 'skills':
        return (
          <section id="skills" className="py-20 bg-slate-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">框架與技術</h2>
                <p className="text-slate-500">後端框架、資料庫與其他技術</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6">
                    <Server size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Framework</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-blue-500 mr-2" size={16} /> CodeIgniter</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-blue-500 mr-2" size={16} /> ThinkPHP</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-blue-500 mr-2" size={16} /> Phalcon</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-blue-500 mr-2" size={16} /> Symfony</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-blue-500 mr-2" size={16} /> Laravel</li>
                  </ul>
                </div>
                <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6">
                    <Database size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Databases and Caches</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-indigo-500 mr-2" size={16} /> MySQL</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-indigo-500 mr-2" size={16} /> MS SQL</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-indigo-500 mr-2" size={16} /> Oracle</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-indigo-500 mr-2" size={16} /> Redis</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-indigo-500 mr-2" size={16} /> MongoDB</li>
                  </ul>
                </div>
                <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-slate-800 text-white rounded-xl flex items-center justify-center mb-6">
                    <Layout size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Other</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-slate-500 mr-2" size={16} /> RabbitMQ</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-slate-500 mr-2" size={16} /> Gearman (Queue)</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-slate-500 mr-2" size={16} /> WebSocket</li>
                    <li className="flex items-center text-slate-600 text-sm"><CheckCircle2 className="text-slate-500 mr-2" size={16} /> Server-Sent Events (SSE)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      case 'experience':
        return (
          <section id="experience" className="py-20 px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">實戰經歷與專案成果</h2>
                <p className="text-slate-500">專注於金融、電商與自動化系統開發</p>
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
          <section id="philosophy" className="pt-32 pb-20 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              {/* Left side: Education */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
                  <GraduationCap className="mr-3 text-blue-600" size={28} />
                  <span>【教育背景】</span>
                </h3>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{education.degree}</h4>
                  <p className="text-sm text-slate-500 font-mono mb-4">({education.period})</p>
                  <p className="text-slate-600 leading-relaxed">
                    {education.description}
                  </p>
                </div>
              </div>

              {/* Right side: Philosophy */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-800">
                  <Globe className="mr-3 text-blue-600" size={28} />
                  <span>【理念與價值】</span>
                </h3>
                <div className="space-y-6">
                  {philosophies.map((philosophy, idx) => {
                    const Icon = philosophy.icon;
                    return (
                      <div className="flex gap-4" key={idx}>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-slate-800">{philosophy.title}</h4>
                          <p className="text-sm text-slate-500">{philosophy.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Charlie Liu
          </div>
          <div className="hidden md:flex space-x-8 font-medium">
            <button onClick={() => setActiveTab('about')} className={`hover:text-blue-600 transition-colors ${activeTab === 'about' ? 'text-blue-600' : ''}`}>關於我</button>
            <button onClick={() => setActiveTab('skills')} className={`hover:text-blue-600 transition-colors ${activeTab === 'skills' ? 'text-blue-600' : ''}`}>框架與技術</button>
            <button onClick={() => setActiveTab('experience')} className={`hover:text-blue-600 transition-colors ${activeTab === 'experience' ? 'text-blue-600' : ''}`}>實戰經驗</button>
            <button onClick={() => setActiveTab('philosophy')} className={`hover:text-blue-600 transition-colors ${activeTab === 'philosophy' ? 'text-blue-600' : ''}`}>背景與理念</button>
          </div>
          <a href="mailto:liuchangli0107@gmail.com" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm">
            聯繫我
          </a>
        </div>
      </nav>

      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="mailto:liuchangli0107@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-full hover:border-blue-500 transition-colors">
              <Mail className="text-blue-600" size={20} />
              <span className="font-medium text-slate-700">liuchangli0107@gmail.com</span>
            </a>
            <a href="tel:0928323276" className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-full hover:border-blue-500 transition-colors">
              <Phone className="text-blue-600" size={20} />
              <span className="font-medium text-slate-700 font-mono">0928-323-276</span>
            </a>
            <a href="https://github.com/charlieliu" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
              <Github size={20} className="text-slate-800" />
              <span className="font-medium text-slate-700">charlieliu</span>
            </a>
            <a href="https://github.com/liuchangli0107-dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
              <Github size={20} className="text-slate-800" />
              <span className="font-medium text-slate-700">liuchangli0107-dev</span>
            </a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Charlie Liu. Built with Structured Logic & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
