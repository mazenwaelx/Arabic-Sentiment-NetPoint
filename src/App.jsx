import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AccuracyGauge from './components/AccuracyGauge';
import SentimentBreakdown from './components/SentimentBreakdown';
import KeywordFrequency from './components/KeywordFrequency';
import ModelArchitecture from './components/ModelArchitecture';
import LiveInference from './components/LiveInference';
import TrainingCurves from './components/TrainingCurves';
import ConfusionMatrix from './components/ConfusionMatrix';
import DatasetExplorer from './components/DatasetExplorer';
import ModelSettings from './components/ModelSettings';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRtl, setIsRtl] = useState(true);
  const [activeTestText, setActiveTestText] = useState('');

  // Handle document direction when isRtl changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isRtl ? 'ar' : 'en');
  }, [isRtl]);

  const toggleLanguage = () => {
    setIsRtl(!isRtl);
  };

  const handleSelectWordForInference = (word) => {
    setActiveTestText(`الفندق كان ${word} جداً ومريح للجميع.`);
    setCurrentTab('inference');
  };

  const handleSelectReviewForTesting = (text) => {
    setActiveTestText(text);
    setCurrentTab('inference');
  };

  return (
    <div className={`min-h-screen bg-[#0f1115] text-slate-100 flex ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Left Navigation Rail */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isRtl={isRtl}
        toggleLanguage={toggleLanguage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          isRtl={isRtl}
          toggleLanguage={toggleLanguage}
        />

        {/* Dynamic Views Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {currentTab === 'overview' && (
            <div className="space-y-6">
              {/* TOP ROW: Radial Accuracy Gauge (Golden Glow) + 3 Sentiment Gauges */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5">
                  <AccuracyGauge isRtl={isRtl} />
                </div>
                <div className="lg:col-span-7">
                  <SentimentBreakdown isRtl={isRtl} />
                </div>
              </div>

              {/* MIDDLE ROW: Arabic Keyword Frequency Bar Chart & 4-Way Ensemble Architecture */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <KeywordFrequency
                    isRtl={isRtl}
                    onSelectWord={handleSelectWordForInference}
                  />
                </div>
                <div className="lg:col-span-6">
                  <ModelArchitecture isRtl={isRtl} />
                </div>
              </div>

              {/* BOTTOM ROW: Live Inference Stream + Training Curves + Confusion Matrix */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-12">
                  <LiveInference
                    isRtl={isRtl}
                    initialText={activeTestText}
                  />
                </div>
                <div className="xl:col-span-7">
                  <TrainingCurves isRtl={isRtl} />
                </div>
                <div className="xl:col-span-5">
                  <ConfusionMatrix isRtl={isRtl} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE INFERENCE STUDIO */}
          {currentTab === 'inference' && (
            <div className="space-y-6">
              <LiveInference
                isRtl={isRtl}
                initialText={activeTestText}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <KeywordFrequency
                  isRtl={isRtl}
                  onSelectWord={handleSelectWordForInference}
                />
                <ModelArchitecture isRtl={isRtl} />
              </div>
            </div>
          )}

          {/* TAB 3: ENSEMBLE ARCHITECTURE */}
          {currentTab === 'architecture' && (
            <div className="space-y-6">
              <ModelArchitecture isRtl={isRtl} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AccuracyGauge isRtl={isRtl} />
                <ConfusionMatrix isRtl={isRtl} />
              </div>
            </div>
          )}

          {/* TAB 4: TRAINING CURVES & METRICS */}
          {currentTab === 'training' && (
            <div className="space-y-6">
              <TrainingCurves isRtl={isRtl} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5">
                  <AccuracyGauge isRtl={isRtl} />
                </div>
                <div className="lg:col-span-7">
                  <ConfusionMatrix isRtl={isRtl} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DATASET EXPLORER */}
          {currentTab === 'dataset' && (
            <div className="space-y-6">
              <DatasetExplorer
                isRtl={isRtl}
                onSelectForTesting={handleSelectReviewForTesting}
              />
              <SentimentBreakdown isRtl={isRtl} />
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {currentTab === 'settings' && (
            <div className="space-y-6">
              <ModelSettings isRtl={isRtl} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
