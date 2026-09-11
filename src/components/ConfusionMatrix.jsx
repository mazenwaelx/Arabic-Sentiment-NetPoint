import React, { useState } from 'react';
import { Grid, Target, CheckCircle, AlertTriangle } from 'lucide-react';
import { CONFUSION_MATRIX } from '../data/mockModelData';

export default function ConfusionMatrix({ isRtl }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  const classes = isRtl ? CONFUSION_MATRIX.classesAr : ["Positive", "Neutral", "Negative"];
  const matrix = CONFUSION_MATRIX.matrix;

  // Calculate cell color based on accuracy / diagonal intensity
  const getCellBg = (rowIdx, colIdx, val) => {
    const isDiagonal = rowIdx === colIdx;
    if (isDiagonal) {
      if (rowIdx === 0) return 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300';
      if (rowIdx === 1) return 'bg-amber-500/25 border-amber-500/50 text-amber-300';
      return 'bg-cyan-500/25 border-cyan-500/50 text-cyan-300';
    }
    // Off diagonal errors
    if (val > 200) return 'bg-rose-500/20 border-rose-500/30 text-rose-300';
    if (val > 100) return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
    return 'bg-black/20 border-white/5 text-slate-400';
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'مصفوفة الارتباك (3x3 Confusion Matrix)' : '3x3 Confusion Matrix & Error Heatmap'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'الفئة الفعلية (True) مقابل الفئة المتوقعة (Predicted)' : 'True Labels vs. Predicted Classifications on Test Split'}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
          {CONFUSION_MATRIX.totalSamples.toLocaleString()} Samples
        </span>
      </div>

      {/* 3x3 Grid Heatmap */}
      <div className="my-2">
        <div className="text-[11px] font-mono text-center text-amber-400 mb-2 font-bold uppercase tracking-wider">
          {isRtl ? '▼ الفئات المتوقعة (Predicted) ▼' : '▼ Predicted Labels ▼'}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[280px]">
            {/* Column Headers */}
            <div className="grid grid-cols-4 gap-2 mb-2 text-center text-xs font-semibold">
              <div className="text-[11px] font-mono text-slate-500 text-left flex items-center">
                {isRtl ? 'الفعلية (True)' : 'True \\ Pred'}
              </div>
              {classes.map((c, i) => (
                <div key={i} className="text-slate-300 font-arabic truncate">
                  {c}
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {matrix.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-4 gap-2 mb-2">
                {/* Row Header */}
                <div className="flex items-center text-xs font-semibold text-slate-300 font-arabic truncate">
                  {classes[rowIdx]}
                </div>

                {/* Cells */}
                {row.map((val, colIdx) => {
                  const isDiag = rowIdx === colIdx;
                  const rowSum = row.reduce((a, b) => a + b, 0);
                  const percentage = ((val / rowSum) * 100).toFixed(1);

                  return (
                    <div
                      key={colIdx}
                      onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx, val, percentage })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative group ${getCellBg(
                        rowIdx,
                        colIdx,
                        val
                      )} hover:scale-105 hover:z-10`}
                    >
                      <div className="text-sm sm:text-base font-bold font-mono">
                        {val.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono opacity-80 mt-0.5">
                        {percentage}%
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-Class Classification Report Table */}
      <div className="pt-3 border-t border-white/5">
        <div className="text-xs text-slate-400 mb-2 font-mono flex items-center justify-between">
          <span>{isRtl ? 'تقرير الأداء لكل تصنيف:' : 'Per-Class Metrics Report:'}</span>
          <span className="text-emerald-400 font-bold">Macro F1: 94.8%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          {CONFUSION_MATRIX.classMetrics.map((item, i) => (
            <div key={i} className="p-2 rounded-xl bg-black/20 border border-white/5">
              <span className="font-bold text-white block mb-0.5">{item.class}</span>
              <div className="text-[10px] text-slate-400 space-y-0.5">
                <div>Prec: <span className="text-emerald-400">{item.precision}</span></div>
                <div>Rec: <span className="text-cyan-400">{item.recall}</span></div>
                <div>F1: <span className="text-amber-400 font-bold">{item.f1}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
