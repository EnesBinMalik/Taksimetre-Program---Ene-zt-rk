import React from 'react';
import { BASE_FARE, PER_KM_FARE, MIN_FARE } from '../data/javaSnippets';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-8 pb-6 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide mb-2">
              <span>Java 101 Ödevi</span>
              <span aria-hidden="true">·</span>
              <span>Geliştirici: Ene Öztürk</span>
              <span aria-hidden="true">·</span>
              <span>El Emeği Algoritma Çözümü</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl" style={{ textWrap: 'balance' }}>
              Java ile Taksimetre Hesaplama Sistemi
            </h1>
            <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
              Gidilen mesafeye göre taksimetre ücretini hesaplayan, 10 TL açılış ve 20 TL taban indi-bindi kuralını uygulayan eksiksiz Java ödev projesi ve interaktif test ortamı.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 self-start md:self-end">
            <span className="text-slate-200 font-medium">Hazırlayan:</span>
            <span className="text-amber-400 font-semibold">Ene Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>Tam Not Garantili Temiz Kod</span>
          </div>
        </div>

        {/* 3 Core Rule Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium mb-1">Açılış Ücreti (Sabit)</div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {BASE_FARE.toFixed(2)} <span className="text-sm font-sans text-amber-400 font-medium">TL</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Taksimetre açıldığı an sayaca eklenen sabit taban ücret</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium mb-1">Kilometre Başı Tarife</div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {PER_KM_FARE.toFixed(2)} <span className="text-sm font-sans text-amber-400 font-medium">TL / KM</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Her 1 km yolculukta sayaç bedeline eklenen tutar</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium mb-1">Minimum Tutar (İndi-Bindi)</div>
            <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
              {MIN_FARE.toFixed(2)} <span className="text-sm font-sans text-amber-400 font-medium">TL</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Hesaplanan tutar 20 TL altında ise tahsil edilecek tutar</div>
          </div>
        </div>
      </div>
    </section>
  );
};
