import React, { useState } from 'react';
import { Settings, Sliders, Shield, RefreshCw, Download, Check, BellRing } from 'lucide-react';
import { MODEL_METRICS } from '../data/mockModelData';

export default function ModelSettings({ isRtl }) {
  const [threshold, setThreshold] = useState(0.75);
  const [enableTokenHeatmap, setEnableTokenHeatmap] = useState(true);
  const [gpuAcceleration, setGpuAcceleration] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'إعدادات النموذج ومعايرة الاستدلال' : 'Model Hyperparameters & Inference Configuration'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'تخصيص عتبات الثقة، وتسريع المعالجة، ونقاط الحفظ' : 'Fine-tune decision boundaries, GPU batch size, and checkpoint parameters'}
            </p>
          </div>
        </div>

        {saved && (
          <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            <Check className="w-4 h-4" />
            {isRtl ? 'تم حفظ التعديلات بنجاح' : 'Settings Saved'}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Decision Thresholds */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-white">
                {isRtl ? 'عتبة اتخاذ القرار (Confidence Threshold)' : 'Classification Confidence Threshold'}
              </label>
              <span className="text-xs font-mono font-bold text-amber-400">{(threshold * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-400">
              {isRtl ? 'يتم تصنيف المراجعة كـ "محايدة" إذا كانت درجة الثقة أقل من هذه العتبة' : 'Predictions with confidence below this threshold fall back to Neutral'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">
                  {isRtl ? 'خريطة الانتباه التلقائية (Token Attention)' : 'Token-Level Attention Map'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {isRtl ? 'تفعيل إبراز الكلمات المؤثرة في المشاعر تلقائياً' : 'Highlight multi-head attention weights during inference'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={enableTokenHeatmap}
                onChange={(e) => setEnableTokenHeatmap(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Model Checkpoints & Export */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-white">
              {isRtl ? 'نقطة حفظ النموذج النشطة (Active Checkpoint)' : 'Active Model Checkpoint'}
            </h4>
            <div className="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-xs space-y-1">
              <div className="text-amber-300 font-bold">{MODEL_METRICS.checkpointVersion}</div>
              <div className="text-slate-400 text-[11px]">Architecture: {MODEL_METRICS.modelName}</div>
              <div className="text-slate-400 text-[11px]">Parameters: {MODEL_METRICS.totalParameters}</div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-gold-glow"
            >
              {isRtl ? 'حفظ التغييرات' : 'Apply Configuration'}
            </button>
            <button
              onClick={() => alert("Model weights and report downloaded successfully.")}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{isRtl ? 'تصدير التقرير' : 'Export'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
