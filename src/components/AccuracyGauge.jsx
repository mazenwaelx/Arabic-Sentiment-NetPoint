import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, TrendingUp, Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { MODEL_METRICS } from '../data/mockModelData';

export default function AccuracyGauge({ isRtl }) {
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedAccuracy(MODEL_METRICS.overallAccuracy);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Radius and circumference calculations for semi-circle radial gauge
  const radius = 80;
  const circumference = Math.PI * radius; // Semi-circle circumference
  const strokeDashoffset = circumference - (animatedAccuracy / 100) * circumference;

  return (
    <div className="glass-card-gold rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/5 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

      {/* Top Header */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300/90 font-mono">
              {isRtl ? 'النموذج الأفضل أداءً' : 'Flagship Model Accuracy'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1 font-display">
            {isRtl ? 'دقة تصنيف المشاعر الإجمالية' : 'Overall Classification Accuracy'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isRtl ? 'تم التحقق منها على 21,098 مراجعة اختبار' : 'Evaluated on 21,098 unseen test reviews'}
          </p>
        </div>

        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+4.8% vs Baseline</span>
        </span>
      </div>

      {/* Center Semi-Circle Radial Gauge */}
      <div className="relative flex flex-col items-center justify-center my-4 py-2 z-10">
        <div className="relative w-56 h-32 flex items-center justify-center">
          <svg className="w-56 h-36 transform overflow-visible" viewBox="0 0 200 120">
            {/* Gradient definition */}
            <defs>
              <linearGradient id="goldAccGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#e5a93c" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background semi-circle track */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#232732"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Animated gauge progress track */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#goldAccGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              filter="url(#goldGlow)"
              className="gauge-circle"
            />

            {/* Scale markers */}
            <circle cx="20" cy="100" r="3" fill="#64748b" />
            <circle cx="100" cy="20" r="3" fill="#64748b" />
            <circle cx="180" cy="100" r="3" fill="#e5a93c" />
          </svg>

          {/* Central Value */}
          <div className="absolute top-10 flex flex-col items-center">
            <span className="text-4xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_15px_rgba(229,169,60,0.4)]">
              {animatedAccuracy.toFixed(2)}%
            </span>
            <span className="text-xs font-semibold text-amber-300/80 font-arabic mt-0.5">
              {isRtl ? 'دقة قياسية' : 'State-of-the-Art'}
            </span>
          </div>
        </div>

        {/* Sub-labels for scale */}
        <div className="w-56 flex justify-between text-[11px] font-mono text-slate-500 px-2 -mt-2">
          <span>0%</span>
          <span>50%</span>
          <span className="text-amber-400 font-bold">100%</span>
        </div>
      </div>

      {/* Bottom Sub-Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-amber-500/20 relative z-10">
        <div className="p-2 rounded-xl bg-black/20 border border-white/5 text-center">
          <span className="text-[10px] text-slate-400 block uppercase font-mono">
            {isRtl ? 'درجة F1' : 'F1-Score'}
          </span>
          <span className="text-sm font-bold font-mono text-amber-300">
            {MODEL_METRICS.f1Score}%
          </span>
        </div>

        <div className="p-2 rounded-xl bg-black/20 border border-white/5 text-center">
          <span className="text-[10px] text-slate-400 block uppercase font-mono">
            {isRtl ? 'الدقة (Precision)' : 'Precision'}
          </span>
          <span className="text-sm font-bold font-mono text-emerald-400">
            {MODEL_METRICS.precision}%
          </span>
        </div>

        <div className="p-2 rounded-xl bg-black/20 border border-white/5 text-center">
          <span className="text-[10px] text-slate-400 block uppercase font-mono">
            {isRtl ? 'الاسترجاع (Recall)' : 'Recall'}
          </span>
          <span className="text-sm font-bold font-mono text-cyan-400">
            {MODEL_METRICS.recall}%
          </span>
        </div>
      </div>
    </div>
  );
}
