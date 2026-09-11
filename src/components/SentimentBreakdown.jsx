import React, { useEffect, useState } from 'react';
import { Smile, Meh, Frown, PieChart, Info, HelpCircle } from 'lucide-react';
import { SENTIMENT_DISTRIBUTION, MODEL_METRICS } from '../data/mockModelData';

export default function SentimentBreakdown({ isRtl }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const getSentimentIcon = (key) => {
    switch (key) {
      case 'positive':
        return <Smile className="w-5 h-5 text-emerald-400" />;
      case 'neutral':
        return <Meh className="w-5 h-5 text-slate-400" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-rose-400" />;
      default:
        return <Smile className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'توزيع المشاعر في مجموعة التدريب' : 'Sentiment Distribution (Class Balance)'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'تحليل 84,443 مراجعة تدريبية متوازنة بنسبة 50/50' : 'Analyzed across 84,443 balanced training reviews'}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          Balanced 50/50 Split
        </span>
      </div>

      {/* Circular Gauges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto py-2">
        {SENTIMENT_DISTRIBUTION.map((item) => {
          const radius = 38;
          const circumference = 2 * Math.PI * radius;
          const targetPercentage = item.percentage;
          const strokeDashoffset = animated
            ? circumference - (targetPercentage / 100) * circumference
            : circumference;

          return (
            <div
              key={item.key}
              className="p-4 rounded-xl bg-black/20 border border-white/5 flex flex-col items-center justify-center relative group hover:border-white/15 transition-all"
            >
              {/* Radial Gauge SVG */}
              <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#232732"
                    strokeWidth="8"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="gauge-circle"
                    style={{
                      filter: `drop-shadow(0 0 6px ${item.glowColor})`,
                    }}
                  />
                </svg>

                {/* Inner Percentage & Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-black font-mono text-white">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Title & Count */}
              <div className="text-center w-full">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  {getSentimentIcon(item.key)}
                  <span className="text-xs font-bold text-slate-200">
                    {isRtl ? item.labelAr : item.labelEn}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {item.count.toLocaleString()} {isRtl ? 'مراجعة' : 'reviews'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stacked Proportional Bar */}
      <div className="mt-4 pt-3 border-t border-white/5">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
          <span>{isRtl ? 'النسبة المتراكمة (Positive vs Negative)' : 'Class Proportions (Positive 1 vs Negative 0)'}</span>
          <span>100% Training Set</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-900 flex overflow-hidden p-0.5 gap-0.5 border border-white/5">
          {SENTIMENT_DISTRIBUTION.map((item, idx) => (
            <div
              key={item.key}
              className={`transition-all duration-1000 ${
                idx === 0 ? 'bg-emerald-500 rounded-l-full' : 'bg-rose-500 rounded-r-full'
              }`}
              style={{ width: `${item.percentage}%` }}
              title={`${item.labelEn}: ${item.percentage}%`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
