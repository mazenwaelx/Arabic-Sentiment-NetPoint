import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Cpu, 
  GitFork, 
  Zap, 
  Table, 
  Sliders, 
  CheckCircle,
  Activity,
  Award
} from 'lucide-react';
import { ENSEMBLE_LAYERS, NOTEBOOK_BENCHMARKS } from '../data/mockModelData';

export default function ModelArchitecture({ isRtl }) {
  const [selectedLayer, setSelectedLayer] = useState(ENSEMBLE_LAYERS[0]);
  const [activeView, setActiveView] = useState('diagram'); // 'diagram' or 'benchmarks'

  const getLayerIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'GitFork': return <GitFork className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Network': return <Network className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'بنية نماذج المشروع والتصنيف' : 'Project Deep Learning Architectures'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'النماذج الـ 6 المدربة في Project.ipynb والدمج الخارق (Ensemble)' : 'All 6 models trained in Project.ipynb + 4-Way Super Ensemble'}
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => setActiveView('diagram')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'diagram'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isRtl ? 'مخطط البنية' : 'Pipeline'}
          </button>
          <button
            onClick={() => setActiveView('benchmarks')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'benchmarks'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isRtl ? 'جدول المقارنة (6 نماذج)' : 'Benchmarks'}
          </button>
        </div>
      </div>

      {activeView === 'diagram' ? (
        /* Visual Block Diagram Pipeline */
        <div className="space-y-2.5 my-2">
          {/* Layer 0: Tokenizer & Normalizer */}
          <div
            onClick={() => setSelectedLayer(ENSEMBLE_LAYERS[0])}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              selectedLayer.id === ENSEMBLE_LAYERS[0].id
                ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_15px_rgba(229,169,60,0.15)]'
                : 'bg-black/30 border-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  {getLayerIcon(ENSEMBLE_LAYERS[0].icon)}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isRtl ? ENSEMBLE_LAYERS[0].nameAr : ENSEMBLE_LAYERS[0].name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">{ENSEMBLE_LAYERS[0].type}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-amber-300">
                {ENSEMBLE_LAYERS[0].params}
              </span>
            </div>
          </div>

          {/* 3 Parallel Deep Learning Streams */}
          <div className="relative py-1">
            <div className="text-[10px] font-mono text-center text-slate-500 uppercase tracking-widest mb-1.5">
              {isRtl ? '▼ النماذج المتوازية في الدمج (Ensemble Branches) ▼' : '▼ 3 Key Parallel Models in Project.ipynb ▼'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Stream A: BiGRU Rich */}
              <div
                onClick={() => setSelectedLayer(ENSEMBLE_LAYERS[1])}
                className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                  selectedLayer.id === ENSEMBLE_LAYERS[1].id
                    ? 'bg-cyan-500/15 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-black/30 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
                    <GitFork className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold text-white">BiGRU Rich-Text</span>
                </div>
                <p className="text-[10px] text-cyan-300 font-mono">94.98% Val Acc</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">Metadata Enriched</p>
              </div>

              {/* Stream B: BiLSTM */}
              <div
                onClick={() => setSelectedLayer(ENSEMBLE_LAYERS[2])}
                className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                  selectedLayer.id === ENSEMBLE_LAYERS[2].id
                    ? 'bg-purple-500/15 border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                    : 'bg-black/30 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded bg-purple-500/20 text-purple-400">
                    <Cpu className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold text-white">BiLSTM Baseline</span>
                </div>
                <p className="text-[10px] text-purple-300 font-mono">94.94% Val Acc</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">Sequence Memory</p>
              </div>

              {/* Stream C: Multi-Head Attention */}
              <div
                onClick={() => setSelectedLayer(ENSEMBLE_LAYERS[3])}
                className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                  selectedLayer.id === ENSEMBLE_LAYERS[3].id
                    ? 'bg-emerald-500/15 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-black/30 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                    <Zap className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-bold text-white">BiLSTM + Attention</span>
                </div>
                <p className="text-[10px] text-emerald-300 font-mono">94.49% Val Acc</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">Multi-Head Focus</p>
              </div>
            </div>
          </div>

          {/* Fusion Head */}
          <div
            onClick={() => setSelectedLayer(ENSEMBLE_LAYERS[4])}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              selectedLayer.id === ENSEMBLE_LAYERS[4].id
                ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_15px_rgba(229,169,60,0.15)]'
                : 'bg-black/30 border-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Network className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isRtl ? ENSEMBLE_LAYERS[4].nameAr : ENSEMBLE_LAYERS[4].name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">{ENSEMBLE_LAYERS[4].type}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold shadow-gold-glow">
                95.06% Score
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Full Architectural Benchmark Table from Project.ipynb */
        <div className="my-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px]">
                <th className="pb-2 font-semibold">{isRtl ? 'النموذج (Model Architecture)' : 'Architecture'}</th>
                <th className="pb-2 font-semibold text-center">{isRtl ? 'دقة التحقق (Val Acc)' : 'Val Accuracy'}</th>
                <th className="pb-2 font-semibold text-center">{isRtl ? 'الخسارة (Val Loss)' : 'Val Loss'}</th>
                <th className="pb-2 font-semibold text-right">{isRtl ? 'المعاملات (Params)' : 'Parameters'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {NOTEBOOK_BENCHMARKS.map((m, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-white/5 transition-colors ${
                    m.isTop ? 'bg-amber-500/10 text-amber-200 font-bold' : 'text-slate-200'
                  }`}
                >
                  <td className="py-2.5 pr-2 font-mono flex items-center gap-1.5">
                    {m.isTop && <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                    <span>{m.name}</span>
                  </td>
                  <td className="py-2.5 text-center font-mono font-bold">
                    <span className={m.accuracy > 94 ? 'text-emerald-400' : m.accuracy > 90 ? 'text-amber-400' : 'text-rose-400'}>
                      {m.accuracy}%
                    </span>
                  </td>
                  <td className="py-2.5 text-center font-mono text-slate-300">
                    {m.valLoss}
                  </td>
                  <td className="py-2.5 text-right font-mono text-slate-400">
                    {m.params}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dynamic Layer Inspector Footer */}
      {selectedLayer && activeView === 'diagram' && (
        <div className="mt-3 p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white font-display">
                {isRtl ? selectedLayer.nameAr : selectedLayer.name}
              </span>
            </div>
            <span className="font-mono text-[11px] text-amber-300 font-bold">{selectedLayer.params}</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{selectedLayer.description}</p>
          <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-black/40 p-1.5 rounded-lg border border-white/5">
            <span className="text-amber-400">Specs:</span>
            <span>{selectedLayer.specs}</span>
          </div>
        </div>
      )}
    </div>
  );
}
