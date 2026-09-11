import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { MessageSquareQuote, Filter, Hash, Sparkles } from 'lucide-react';
import { KEYWORD_FREQUENCIES } from '../data/mockModelData';

export default function KeywordFrequency({ isRtl, onSelectWord }) {
  const [filter, setFilter] = useState('all'); // all, positive, negative, neutral
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const filteredData = KEYWORD_FREQUENCIES.filter((item) => {
    if (filter === 'all') return true;
    return item.sentiment === filter;
  });

  const getBarColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#10b981'; // Emerald
      case 'negative':
        return '#ef4444'; // Ruby Red
      case 'neutral':
        return '#64748b'; // Slate
      default:
        return '#e5a93c';
    }
  };

  const handleWordClick = (wordObj) => {
    setSelectedKeyword(wordObj);
    if (onSelectWord) {
      onSelectWord(wordObj.word);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'تحليل تردد الكلمات والمصطلحات الدلالية' : 'Arabic Keyword Frequency & N-Gram Cloud'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'أبرز المفردات المستخرجة من 105,487 مراجعة فندقية' : 'Top features extracted from 105K Arabic hotel reviews'}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 self-start sm:self-auto">
          {[
            { id: 'all', labelEn: 'All', labelAr: 'الكل' },
            { id: 'positive', labelEn: 'Positive', labelAr: 'إيجابي' },
            { id: 'negative', labelEn: 'Negative', labelAr: 'سلبي' },
            { id: 'neutral', labelEn: 'Neutral', labelAr: 'محايد' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === btn.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isRtl ? btn.labelAr : btn.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="h-64 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData.slice(0, 8)}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#232732" horizontal={false} />
            <XAxis
              type="number"
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              dataKey="word"
              type="category"
              stroke="#cbd5e1"
              fontSize={13}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              width={85}
              orientation={isRtl ? 'right' : 'left'}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 rounded-xl bg-[#16181d] border border-white/10 shadow-xl text-xs">
                      <p className="font-bold text-base text-white font-arabic mb-1">{data.word} ({data.wordEn})</p>
                      <p className="text-slate-300">
                        {isRtl ? 'التكرار:' : 'Frequency:'} <span className="font-mono font-bold text-amber-400">{data.count.toLocaleString()}</span>
                      </p>
                      <p className="text-slate-300 mt-0.5">
                        {isRtl ? 'التصنيف:' : 'Sentiment:'}{' '}
                        <span className={`capitalize font-bold ${
                          data.sentiment === 'positive' ? 'text-emerald-400' :
                          data.sentiment === 'negative' ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                          {data.sentiment}
                        </span>
                      </p>
                      <p className="text-slate-400 text-[10px] mt-1">
                        {isRtl ? 'انقر للاختبار في محاكي التنبؤ' : 'Click word to test in Live Inference'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="count" 
              radius={[0, 8, 8, 0]}
              onClick={(entry) => handleWordClick(entry)}
              cursor="pointer"
            >
              {filteredData.slice(0, 8).map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.sentiment)}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Keyword Cloud / Tag Badges */}
      <div className="pt-3 border-t border-white/5">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-amber-400" />
            {isRtl ? 'كلمات دلالية شائعة (انقر للاختبار):' : 'Clickable Keyword Tags for Live Test:'}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {filteredData.length} {isRtl ? 'مصطلح' : 'tokens'}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
          {filteredData.map((kw, i) => (
            <button
              key={i}
              onClick={() => handleWordClick(kw)}
              className={`px-2.5 py-1 rounded-lg text-xs font-arabic transition-all flex items-center gap-1.5 ${
                kw.sentiment === 'positive'
                  ? 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/20'
                  : kw.sentiment === 'negative'
                  ? 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20'
                  : 'bg-slate-500/10 text-slate-300 hover:bg-slate-500/20 border border-slate-500/20'
              }`}
            >
              <span className="font-semibold">{kw.word}</span>
              <span className="text-[10px] font-mono opacity-60">({(kw.count / 1000).toFixed(1)}k)</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
