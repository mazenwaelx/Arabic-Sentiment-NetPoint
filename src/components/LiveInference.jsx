import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Smile, 
  Meh, 
  Frown, 
  Cpu, 
  Gauge, 
  Layers,
  Copy,
  Check,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_REVIEWS, analyzeArabicSentiment } from '../data/mockModelData';

export default function LiveInference({ isRtl, initialText }) {
  const [inputText, setInputText] = useState(SAMPLE_REVIEWS[0].text);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Analyze text whenever it changes or on load
  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const res = analyzeArabicSentiment(inputText);
      setResult(res);
      setIsAnalyzing(false);

      // Trigger celebratory confetti when strong positive sentiment is detected
      if (res.sentiment === 'positive' && res.confidence > 92) {
        try {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#e5a93c', '#10b981', '#f59e0b']
          });
        } catch (e) {
          // ignore in environments without canvas
        }
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [inputText]);

  const handlePresetSelect = (preset) => {
    setInputText(preset.text);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSentimentBadge = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold shadow-emerald-glow">
            <Smile className="w-5 h-5" />
            <span>{isRtl ? 'إيجابي / ممتاز' : 'Positive / Excellent'}</span>
          </div>
        );
      case 'negative':
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold shadow-ruby-glow">
            <Frown className="w-5 h-5" />
            <span>{isRtl ? 'سلبي / غير راضٍ' : 'Negative / Critical'}</span>
          </div>
        );
      case 'neutral':
      default:
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-500/15 border border-slate-500/30 text-slate-300 font-bold">
            <Meh className="w-5 h-5" />
            <span>{isRtl ? 'محايد / عادي' : 'Neutral / Average'}</span>
          </div>
        );
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 text-amber-400 shadow-gold-glow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'مختبر التنبؤ الحي والتصنيف الفوري' : 'Live Interactive Inference & Prediction Stream'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'اكتب أو اختر نصاً عربياً لاختبار دقة النموذج في الوقت الفعلي' : 'Type or pick an Arabic review to test the ensemble in real time'}
            </p>
          </div>
        </div>

        {/* Dialect / Latency Badge */}
        {result && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-cyan-300">
              {result.detectedDialect}
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-emerald-400 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              {result.latencyMs}ms
            </span>
          </div>
        )}
      </div>

      {/* Preset Review Chips */}
      <div className="mb-3">
        <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
          <span>{isRtl ? 'نماذج مراجعات جاهزة للاختبار:' : 'Sample Arabic Review Presets:'}</span>
          <span className="text-[10px] text-amber-400/80 font-mono">Click to test</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLE_REVIEWS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className="p-2 rounded-xl text-left bg-black/30 hover:bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all text-xs group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-200 group-hover:text-amber-300 truncate font-arabic">
                  {preset.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 block truncate">
                {preset.dialect}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative mb-4">
        <textarea
          dir="rtl"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isRtl ? 'اكتب مراجعة فندقية باللغة العربية هنا...' : 'Write an Arabic review here...'}
          rows={3}
          className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 text-white font-arabic text-sm resize-none outline-none transition-all placeholder:text-slate-600"
        />
        
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
            title="Copy text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setInputText('')}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs"
            title="Clear text"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real-time Token Attention Heatmap Visualizer */}
      {result && result.tokens && result.tokens.length > 0 && (
        <div className="mb-4 p-3.5 rounded-xl bg-black/30 border border-white/5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {isRtl ? 'خريطة الانتباه الدلالي على مستوى الكلمات (Multi-Head Attention Heatmap):' : 'Token-Level Multi-Head Attention Heatmap:'}
            </span>
            <span className="text-[10px] font-mono text-slate-500">AraBERT Weights</span>
          </div>

          <div className="flex flex-wrap gap-1.5 font-arabic text-sm leading-loose" dir="rtl">
            {result.tokens.map((token, i) => {
              const weight = token.weight || 0.1;
              let bgStyle = 'bg-white/5 text-slate-300 border-white/5';
              
              if (weight > 0.8) {
                bgStyle = token.type === 'negative'
                  ? 'bg-rose-500/25 text-rose-200 border-rose-500/40 font-bold shadow-[0_0_8px_rgba(244,63,94,0.3)]'
                  : token.type === 'positive'
                  ? 'bg-emerald-500/25 text-emerald-200 border-emerald-500/40 font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                  : 'bg-amber-500/25 text-amber-200 border-amber-500/40 font-bold';
              } else if (weight > 0.5) {
                bgStyle = 'bg-amber-500/15 text-amber-200 border-amber-500/20';
              }

              return (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded-md border text-xs transition-all ${bgStyle}`}
                  title={`Attention Weight: ${weight.toFixed(2)}`}
                >
                  {token.text}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Inference Output Cards */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/5">
          {/* Main Sentiment Classification Badge */}
          <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-mono mb-2">
              {isRtl ? 'التصنيف المتوقع' : 'Predicted Sentiment'}
            </span>
            {getSentimentBadge(result.sentiment)}
            <span className="text-[11px] text-slate-500 mt-2 font-mono">
              Calibrated Softmax Output
            </span>
          </div>

          {/* Confidence Score Gauge */}
          <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400 font-mono">
                {isRtl ? 'درجة الثقة' : 'Confidence Score'}
              </span>
              <span className="text-sm font-black font-mono text-amber-400">
                {result.confidence}%
              </span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden my-1">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  result.sentiment === 'positive' ? 'bg-emerald-500 shadow-emerald-glow' :
                  result.sentiment === 'negative' ? 'bg-rose-500 shadow-ruby-glow' : 'bg-slate-400'
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>

            <span className="text-[11px] text-slate-500 font-mono">
              {result.confidence > 90 ? 'High Certainty' : 'Moderate Certainty'}
            </span>
          </div>

          {/* Softmax Probability Distribution */}
          <div className="p-3.5 rounded-xl bg-black/20 border border-white/5 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-mono mb-1.5">
              {isRtl ? 'توزيع الاحتمالات' : 'Class Probabilities'}
            </span>

            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-emerald-400">
                <span>{isRtl ? 'إيجابي' : 'Pos'}:</span>
                <span className="font-bold">{result.probabilities.positive}%</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>{isRtl ? 'محايد' : 'Neu'}:</span>
                <span className="font-bold">{result.probabilities.neutral}%</span>
              </div>
              <div className="flex items-center justify-between text-rose-400">
                <span>{isRtl ? 'سلبي' : 'Neg'}:</span>
                <span className="font-bold">{result.probabilities.negative}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
