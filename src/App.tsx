import React, { useState } from 'react';
import { LightingMode, Language } from './types';
import RayDiagram from './components/RayDiagram';
import SimulatedImage from './components/SimulatedImage';
import AIChat from './components/AIChat';
import { Sun, Moon, Info, Languages } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<LightingMode>(LightingMode.BRIGHT_FIELD);
  const [language, setLanguage] = useState<Language>('zh');

  const toggleMode = (newMode: LightingMode) => {
    setMode(newMode);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const isZh = language === 'zh';

  // Content dictionary for simple translation handling
  const t = {
    title: isZh ? "机器视觉光学" : "VisionOptics",
    subtitle: isZh ? "照明的核心逻辑" : "Illumination Logic",
    desc: isZh 
      ? "掌握机器视觉打光最底层的物理逻辑：亮视野 vs 暗视野。"
      : "Master the core physics of machine vision: The battle between Bright Field and Dark Field.",
    
    // Bright Field Content
    bfTitle: isZh ? "亮视野 (Bright Field)" : "Bright Field Logic",
    bfDesc: isZh 
      ? "原理：光源位于相机与物体之间。光线垂直照射到平坦表面后，直接反射进入镜头（镜面反射），因此背景是白色的。而凹凸不平的特征（如刻字、划痕）会将光线散射到侧面，无法进入镜头，呈现为黑色。"
      : "Light source is high/coaxial. Light hits the flat surface and reflects directly into the lens (specular reflection), making the background bright. Defects scatter light sideways, appearing dark.",
    
    // Dark Field Content
    dfTitle: isZh ? "暗视野 (Dark Field) / 低角度照明" : "Dark Field Logic",
    dfDesc: isZh
      ? "原理：光源以极低的角度（通常 0°~30°）照射物体。大部分光线照射到平坦表面后，像打水漂一样反射离开，不进镜头。只有遇到突起、边缘、划痕时，光线才会发生改变方向，反射进入镜头。背景呈黑色，特征呈亮白色。"
      : "Light source is at a low angle (0-30°). Light hitting the flat surface reflects away from the lens. Only when light hits an edge or scratch does it deflect UP into the lens, making the defect shine brightly.",

    // Button Labels
    btnBf: isZh ? "亮视野" : "Bright Field",
    btnDf: isZh ? "暗视野" : "Dark Field",

    // Real World Section
    rwTitle: isZh ? "实际应用案例" : "Real-world Application",
    rwIntro: isZh
      ? "图例分析（截图中的硬币和芯片）："
      : "The Coin & Chip Example: When inspecting a coin or a microchip, the background is often reflective.",
    
    rwBfHeader: isZh ? "亮视野下：" : "In Bright Field:",
    rwBfText: isZh
      ? "平坦的金属表面像镜子一样，将光线直接反射进相机，导致背景过曝（全白）。特征难以辨认。"
      : "The flat metal acts like a mirror, blinding the camera with white glare. The text is hard to read because it blends in or just looks messy.",
    
    rwDfHeader: isZh ? "暗视野下：" : "In Dark Field:",
    rwDfText: isZh
      ? "背景漆黑，但“5分”、“LM386”字样轮廓非常清晰高亮。这是因为平坦表面将光反射走，而字体的边缘将低角度的光“折射”进了相机。"
      : "The flat mirror-like surface reflects light *away* from the camera (Black background). However, the raised edges of the '5 cents' or 'LM386' text catch the low-angle light and redirect it into the lens. The result? Crystal clear, glowing text."
  };

  return (
    <div className="min-h-screen bg-optics-dark text-slate-200 pb-20">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              {t.title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
             <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:border-slate-500 hover:text-white transition-all text-sm text-slate-400"
             >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'English' : '中文'}</span>
             </button>
             <div className="text-xs font-mono text-slate-500 hidden md:block">
               INTERACTIVE LEARNING
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Hero / Intro */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            {t.subtitle}
          </h2>
          <p className="text-slate-400 text-lg">
            {t.desc}
          </p>
        </section>

        {/* Interactive Simulation Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Controls & Diagram (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap justify-center gap-4 bg-slate-800/50 p-2 rounded-xl mx-auto w-full md:w-auto">
              <button
                onClick={() => toggleMode(LightingMode.BRIGHT_FIELD)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  mode === LightingMode.BRIGHT_FIELD
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50 ring-2 ring-cyan-400/50'
                    : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="font-semibold">{t.btnBf}</span>
              </button>
              <button
                onClick={() => toggleMode(LightingMode.DARK_FIELD)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  mode === LightingMode.DARK_FIELD
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 ring-2 ring-blue-400/50'
                    : 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="font-semibold">{t.btnDf}</span>
              </button>
            </div>

            <RayDiagram mode={mode} language={language} />
            
            {/* Contextual Info Card */}
            <div className={`
              border rounded-xl p-6 transition-all duration-500
              ${mode === LightingMode.BRIGHT_FIELD 
                ? 'bg-cyan-900/20 border-cyan-800/50' 
                : 'bg-blue-900/20 border-blue-800/50'}
            `}>
              <h3 className={`text-xl font-bold mb-2 flex items-center ${
                 mode === LightingMode.BRIGHT_FIELD ? 'text-cyan-400' : 'text-blue-400'
              }`}>
                <Info className="w-5 h-5 mr-2" />
                {mode === LightingMode.BRIGHT_FIELD ? t.bfTitle : t.dfTitle}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {mode === LightingMode.BRIGHT_FIELD ? t.bfDesc : t.dfDesc}
              </p>
            </div>
          </div>

          {/* Camera Output Simulation (Span 1) */}
          <div className="lg:col-span-1 flex flex-col items-center justify-start space-y-6 bg-slate-800/30 p-6 rounded-xl border border-slate-800 h-full">
            <SimulatedImage mode={mode} language={language} />
          </div>

        </section>

        <hr className="border-slate-800" />

        {/* Real World Examples Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <span className="w-1 h-8 bg-optics-accent mr-3 rounded-full"></span>
                  {t.rwTitle}
                </h3>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <p className="font-medium text-slate-200 mb-4">
                        {t.rwIntro}
                    </p>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-900/50 rounded-lg border-l-4 border-cyan-500">
                             <span className="text-cyan-400 font-bold block mb-1">{t.rwBfHeader}</span> 
                             <p className="text-slate-400 text-sm">{t.rwBfText}</p>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-lg border-l-4 border-blue-500">
                             <span className="text-blue-400 font-bold block mb-1">{t.rwDfHeader}</span> 
                             <p className="text-slate-400 text-sm">{t.rwDfText}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Tutor Integration */}
            <div className="h-full min-h-[400px] flex flex-col">
               <h3 className="text-lg font-bold text-slate-400 mb-4 hidden md:block">
                  {isZh ? '遇到问题？问问 AI 助教' : 'Have questions? Ask AI'}
               </h3>
               <div className="flex-1">
                 <AIChat language={language} /> 
               </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default App;
