import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { LineChart as ChartIcon, Activity, Zap, TrendingDown, TrendingUp } from 'lucide-react';
import { TRAINING_HISTORY, MODEL_METRICS } from '../data/mockModelData';

export default function TrainingCurves({ isRtl }) {
  const [metricView, setMetricView] = useState('both'); // 'loss', 'accuracy', 'both'

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      {/* Header & Metric View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <ChartIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'منحنيات التدريب عبر 40 حقبة (Training Curves)' : 'Training Loss vs. Validation Metrics (40 Epochs)'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'متابعة تقارب دالة الخسارة ودقة التحقق' : 'Convergence of Cross-Entropy Loss & Accuracy over 40 epochs'}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 self-start sm:self-auto">
          {[
            { id: 'both', labelEn: 'Loss & Acc', labelAr: 'الخسارة والدقة' },
            { id: 'accuracy', labelEn: 'Accuracy %', labelAr: 'الدقة فقط' },
            { id: 'loss', labelEn: 'Loss', labelAr: 'الخسارة فقط' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setMetricView(btn.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                metricView === btn.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isRtl ? btn.labelAr : btn.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-64 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TRAINING_HISTORY} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#232732" />
            <XAxis
              dataKey="epoch"
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(v) => `Ep ${v}`}
            />
            {metricView !== 'accuracy' && (
              <YAxis
                yAxisId="left"
                stroke="#64748b"
                fontSize={11}
                domain={[0, 0.8]}
                tickFormatter={(v) => v.toFixed(2)}
                orientation="left"
              />
            )}
            {metricView !== 'loss' && (
              <YAxis
                yAxisId="right"
                stroke="#64748b"
                fontSize={11}
                domain={[65, 100]}
                tickFormatter={(v) => `${v}%`}
                orientation="right"
              />
            )}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3 rounded-xl bg-[#16181d] border border-white/10 shadow-2xl text-xs space-y-1 font-mono">
                      <p className="font-bold text-white text-sm border-b border-white/10 pb-1">
                        Epoch {label} / 40
                      </p>
                      {payload.map((item, idx) => (
                        <p key={idx} style={{ color: item.color }} className="flex justify-between gap-4">
                          <span>{item.name}:</span>
                          <span className="font-bold">{item.value}</span>
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />

            {/* Accuracy Lines */}
            {(metricView === 'both' || metricView === 'accuracy') && (
              <>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="valAcc"
                  name={isRtl ? 'دقة التحقق (Val Acc)' : 'Validation Accuracy'}
                  stroke="#e5a93c"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: '#e5a93c' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="trainAcc"
                  name={isRtl ? 'دقة التدريب (Train Acc)' : 'Training Accuracy'}
                  stroke="#10b981"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </>
            )}

            {/* Loss Lines */}
            {(metricView === 'both' || metricView === 'loss') && (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="valLoss"
                  name={isRtl ? 'خسارة التحقق (Val Loss)' : 'Validation Loss'}
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="trainLoss"
                  name={isRtl ? 'خسارة التدريب (Train Loss)' : 'Training Loss'}
                  stroke="#64748b"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={false}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Epoch Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/5 text-xs">
        <div className="p-2 rounded-xl bg-black/20 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-mono">Best Val Loss</span>
          <span className="text-sm font-bold font-mono text-emerald-400">{MODEL_METRICS.valLoss}</span>
        </div>
        <div className="p-2 rounded-xl bg-black/20 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-mono">Peak Val Accuracy</span>
          <span className="text-sm font-bold font-mono text-amber-400">{MODEL_METRICS.overallAccuracy}%</span>
        </div>
        <div className="p-2 rounded-xl bg-black/20 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-mono">Optimizer</span>
          <span className="text-xs font-semibold text-slate-200">AdamW (lr=3e-4)</span>
        </div>
        <div className="p-2 rounded-xl bg-black/20 border border-white/5">
          <span className="text-[10px] text-slate-400 block font-mono">Early Stopping</span>
          <span className="text-xs font-semibold text-cyan-300">Patience: 5 Epochs</span>
        </div>
      </div>
    </div>
  );
}
