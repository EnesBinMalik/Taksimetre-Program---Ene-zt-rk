import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MeterSimulator } from './components/MeterSimulator';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { JavaConsole } from './components/JavaConsole';
import { AlgorithmFlowchart } from './components/AlgorithmFlowchart';
import { TestMatrix } from './components/TestMatrix';
import { HomeworkDossier } from './components/HomeworkDossier';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [currentKm, setCurrentKm] = useState<number>(5.0);

  const handleSelectKmFromTest = (km: number) => {
    setCurrentKm(km);
    setActiveTab('simulator');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Navigation Bar complying with the Top Bar Contract */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Section with 3 Core Rules and Ene Öztürk Signature */}
      <HeroSection />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Interactive Tab Switcher Strip for Quick Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto no-print">
          {[
            { id: 'simulator', label: '1. Taksimetre Simülatörü' },
            { id: 'code', label: '2. Java Kaynak Kodu' },
            { id: 'terminal', label: '3. Canlı Java Terminali' },
            { id: 'flowchart', label: '4. Akış Şeması' },
            { id: 'tests', label: '5. Test Matrisi' },
            { id: 'report', label: '6. Ödev Teslim Raporu' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Simulator */}
        {activeTab === 'simulator' && (
          <section className="space-y-10">
            <MeterSimulator currentKm={currentKm} setCurrentKm={setCurrentKm} />
            <TestMatrix onSelectKm={handleSelectKmFromTest} />
          </section>
        )}

        {/* Tab 2: Java Code */}
        {activeTab === 'code' && (
          <section>
            <JavaCodeViewer />
          </section>
        )}

        {/* Tab 3: Virtual Console */}
        {activeTab === 'terminal' && (
          <section>
            <JavaConsole />
          </section>
        )}

        {/* Tab 4: Flowchart */}
        {activeTab === 'flowchart' && (
          <section>
            <AlgorithmFlowchart currentKm={currentKm} />
          </section>
        )}

        {/* Tab 5: Test Matrix */}
        {activeTab === 'tests' && (
          <section>
            <TestMatrix onSelectKm={handleSelectKmFromTest} />
          </section>
        )}

        {/* Tab 6: Official Homework Report / Dossier */}
        {activeTab === 'report' && (
          <section>
            <HomeworkDossier />
          </section>
        )}
      </main>

      {/* Quiet, Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Taksimetre Programı</span>
            <span aria-hidden="true">·</span>
            <span>Geliştirici: <strong className="text-amber-400 font-semibold">Ene Öztürk</strong></span>
            <span aria-hidden="true">·</span>
            <span>El Emeği Algoritma Çözümü</span>
          </div>
          <div>Java SE 17+ · Scanner &amp; Ternary Operatörü · Tam Not Standardı</div>
        </div>
      </footer>
    </div>
  );
}
