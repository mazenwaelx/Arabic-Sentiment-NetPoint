import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  Database, 
  Layers, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Bell, 
  Share2,
  RefreshCw
} from 'lucide-react';
import { MODEL_METRICS } from '../data/mockModelData';

export default function Header({ isRtl, toggleLanguage, onResetDemo }) {
  return (
    <header className="sticky top-0 z-20 bg-[#0f1115]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Subtitle */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-400/10 to-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-gold-glow flex-shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-display">
                {isRtl ? 'لوحة تحليل المشاعر باللغة العربية' : 'ARABIC SENTIMENT ANALYSIS DASHBOARD'}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{isRtl ? 'النموذج مفعّل' : 'Ensemble Active'}</span>
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5 font-arabic">
              {isRtl
                ? 'نظام تعلم عميق متعدد المسارات (BiGRU + BiLSTM + Multi-Head Attention) لتقييم آراء النزلاء'
                : 'Multi-Branch Deep Learning NLP Ensemble (BiGRU + BiLSTM + Attention) trained on 105K Arabic Reviews'}
            </p>
          </div>
        </div>

        {/* Right Status Badges & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Accuracy Highlight Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-slate-300">
              {isRtl ? 'الدقة:' : 'Accuracy:'}
            </span>
            <span className="text-sm font-bold font-mono text-amber-400">
              {MODEL_METRICS.overallAccuracy}%
            </span>
          </div>

          {/* Dataset Size Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="text-xs">
              {isRtl ? 'مجموعة البيانات:' : 'Dataset:'}
            </span>
            <span className="text-xs font-bold font-mono text-white">
              {MODEL_METRICS.datasetSize.toLocaleString()}
            </span>
          </div>

          {/* Latency Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400 font-bold">
              ~{MODEL_METRICS.inferenceLatencyMs}ms
            </span>
            <span className="text-[10px] text-slate-400">GPU</span>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all"
            title="Toggle Language & Direction"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{isRtl ? 'EN' : 'العربية'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
