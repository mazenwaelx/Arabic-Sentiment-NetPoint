import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Network, 
  LineChart, 
  Database, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  Activity,
  Bot,
  Layers,
  Cpu
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  isCollapsed, 
  setIsCollapsed, 
  isRtl, 
  toggleLanguage 
}) {
  const navItems = [
    { id: 'overview', labelEn: 'Overview Dashboard', labelAr: 'لوحة التحكم العامة', icon: LayoutDashboard, badge: 'Live' },
    { id: 'inference', labelEn: 'Live Inference Studio', labelAr: 'مختبر التنبؤ المباشر', icon: Sparkles, badge: 'Interactive' },
    { id: 'architecture', labelEn: 'Ensemble Architecture', labelAr: 'بنية النموذج المتكامل', icon: Network, badge: '4-Way' },
    { id: 'training', labelEn: 'Training & Curves', labelAr: 'منحنيات التدريب والمصفوفة', icon: LineChart, badge: '40 Ep' },
    { id: 'dataset', labelEn: '105K Dataset Explorer', labelAr: 'مستكشف البيانات (105K)', icon: Database, badge: 'Arabic' },
    { id: 'settings', labelEn: 'Model Config & Tuning', labelAr: 'الإعدادات والمعايرة', icon: Settings },
  ];

  return (
    <aside 
      className={`relative flex flex-col justify-between transition-all duration-300 ease-in-out bg-[#16181d] border-r border-white/5 z-30 ${
        isCollapsed ? 'w-20' : 'w-72'
      } ${isRtl ? 'border-l border-r-0' : 'border-r'}`}
    >
      {/* Top Branding Section */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 text-amber-400 shadow-gold-glow flex-shrink-0">
              <Bot className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-white font-display truncate">
                    {isRtl ? 'مشاعر ديب ليرنينغ' : 'ArabSentiment AI'}
                  </span>
                  <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                    v4.2
                  </span>
                </div>
                <span className="text-xs text-slate-400 truncate">
                  {isRtl ? 'نظام تحليل المشاعر المتقدم' : 'NLP Deep Learning Suite'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
            ) : (
              isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Model Live Status Card (Collapsed / Expanded) */}
        {!isCollapsed && (
          <div className="mx-3 mt-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-xs font-semibold text-amber-200">
                  {isRtl ? 'حالة النموذج: نشط' : 'Model Status: Active'}
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400">
                95.06%
              </span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-1.5 rounded-full" 
                style={{ width: '95.06%' }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
              <span>{isRtl ? 'الاستجابة: ~12ms' : 'Latency: ~12ms'}</span>
              <span>{isRtl ? 'مجموعة 105K' : '105K Dataset'}</span>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[0_0_15px_rgba(229,169,60,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
                title={isCollapsed ? (isRtl ? item.labelAr : item.labelEn) : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                }`} />

                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full overflow-hidden">
                    <span className="truncate">{isRtl ? item.labelAr : item.labelEn}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                        isActive 
                          ? 'bg-amber-400/20 text-amber-200' 
                          : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {isActive && (
                  <span className={`absolute ${isRtl ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full'} top-2 bottom-2 w-1 bg-amber-400 shadow-[0_0_8px_#f59e0b]`} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Account / Language Switcher */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {/* Language & RTL toggle */}
        <button
          onClick={toggleLanguage}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all ${
            isCollapsed ? 'px-1' : ''
          }`}
        >
          <span className="text-amber-400">🌐</span>
          {!isCollapsed && (
            <span>{isRtl ? 'Switch to English (LTR)' : 'التبديل إلى العربية (RTL)'}</span>
          )}
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs flex-shrink-0">
            DL
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-white truncate">
                AI NLP Research Lab
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                GPU Server Connected
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
