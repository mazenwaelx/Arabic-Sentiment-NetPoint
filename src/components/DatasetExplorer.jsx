import React, { useState } from 'react';
import { Database, Search, Filter, Star, Sparkles, MapPin, Tag } from 'lucide-react';

export default function DatasetExplorer({ isRtl, onSelectForTesting }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('all');

  const datasetSamples = [
    {
      id: "REV-10492",
      text: "فندق ممتاز من جميع النواحي، الاستقبال رائع والخدمة سريعة جداً والغرفة مطلة على البحر ونظيفة لأعلى درجة.",
      sentiment: "positive",
      rating: 5,
      location: "دبي، الإمارات",
      dialect: "فصحى / MSA",
      confidence: 0.98,
    },
    {
      id: "REV-10493",
      text: "الموقع استثنائي بجانب الحرم المكي الشريف، الموظفون ودودون للغاية والإفطار غني بالأصناف العربية والعالمية.",
      sentiment: "positive",
      rating: 5,
      location: "مكة المكرمة، السعودية",
      dialect: "فصحى / MSA",
      confidence: 0.97,
    },
    {
      id: "REV-10494",
      text: "تجربة سيئة جداً بصراحة، التكييف كان عطلان والخدمة بطيئة ومفيش أي اهتمام بالنزلاء، لا أنصح بيه أبداً.",
      sentiment: "negative",
      rating: 1,
      location: "القاهرة، مصر",
      dialect: "مصري / Egyptian",
      confidence: 0.96,
    },
    {
      id: "REV-10495",
      text: "الفندق عادي جداً ومناسب فقط للمبيت السريع، السعر معقول ولكن الأثاث قديم ويحتاج تجديد.",
      sentiment: "neutral",
      rating: 3,
      location: "الرياض، السعودية",
      dialect: "خليجي / Gulf",
      confidence: 0.82,
    },
    {
      id: "REV-10496",
      text: "المكان رائع وإطلالته بتجنن والاستقبال بجننوا، بس المصعد كان شوي بطيء بس إجمالاً بنرجعله أكيد.",
      sentiment: "positive",
      rating: 4,
      location: "بيروت، لبنان",
      dialect: "شامي / Levantine",
      confidence: 0.91,
    },
    {
      id: "REV-10497",
      text: "الغرفة غير نظيفة ورائحة التدخين في الممرات مزعجة للغاية، لن أكرر الزيارة.",
      sentiment: "negative",
      rating: 1,
      location: "الإسكندرية، مصر",
      dialect: "فصحى / MSA",
      confidence: 0.95,
    },
    {
      id: "REV-10498",
      text: "الخدمة متوسطة، الموقع جيد بالقرب من مراكز التسوق لكن المواقف غير متوفرة بشكل كافٍ.",
      sentiment: "neutral",
      rating: 3,
      location: "عمان، الأردن",
      dialect: "فصحى / MSA",
      confidence: 0.78,
    },
  ];

  const filteredReviews = datasetSamples.filter((rev) => {
    const matchesSearch = rev.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rev.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rev.dialect.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSentiment = selectedSentiment === 'all' || rev.sentiment === selectedSentiment;
    return matchesSearch && matchesSentiment;
  });

  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {isRtl ? 'مستكشف بيانات المراجعات العربية (105K Corpus)' : '105K Arabic Hotel Reviews Dataset Explorer'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRtl ? 'تصفح وفلترة مراجعات النزلاء بمختلف اللهجات العربية' : 'Browse, filter, and inspect labeled hotel reviews across Arabic dialects'}
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isRtl ? 'بحث في النصوص أو اللهجات...' : 'Search review text, dialect...'}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500/50 w-56 font-arabic"
            />
          </div>

          {/* Sentiment Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/5">
            {['all', 'positive', 'neutral', 'negative'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSentiment(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedSentiment === s
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Table / Grid */}
      <div className="space-y-3">
        {filteredReviews.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left/Main Text Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  {item.id}
                </span>
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {item.location}
                </span>
                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {item.dialect}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-100 font-arabic leading-relaxed" dir="rtl">
                "{item.text}"
              </p>
            </div>

            {/* Right Action & Sentiment Badge */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-xl border ${
                  item.sentiment === 'positive'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : item.sentiment === 'negative'
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    : 'bg-slate-500/15 text-slate-300 border-slate-500/30'
                }`}
              >
                {item.sentiment.toUpperCase()} ({(item.confidence * 100).toFixed(0)}%)
              </span>

              {onSelectForTesting && (
                <button
                  onClick={() => onSelectForTesting(item.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
                  title="Test in Live Inference"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'اختبار' : 'Test'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
