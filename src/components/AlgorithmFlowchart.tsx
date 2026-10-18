import React from 'react';
import { GitCommit, ArrowDown, Check, HelpCircle } from 'lucide-react';
import { calculateFare } from '../data/javaSnippets';

interface AlgorithmFlowchartProps {
  currentKm: number;
}

export const AlgorithmFlowchart: React.FC<AlgorithmFlowchartProps> = ({ currentKm }) => {
  const fare = calculateFare(currentKm);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Algoritma Akış Şeması (Flowchart)</h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Programın çalışma mantığı, karar ağacı ve değişken dönüşümleri (Geliştirici: Ene Öztürk)
        </p>
      </div>

      {/* Visual Flowchart Nodes */}
      <div className="flex flex-col items-center max-w-2xl mx-auto space-y-4 py-4">
        
        {/* Node 1: Start */}
        <div className="w-56 px-4 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-center shadow-md">
          <div className="text-xs font-mono font-bold text-emerald-400">BAŞLA (Start)</div>
          <div className="text-[10px] text-slate-400">Program başlatılır</div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Node 2: Variable Declaration */}
        <div className="w-72 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center shadow-md">
          <div className="text-xs font-semibold text-white">Değişkenleri ve Sabitleri Ata</div>
          <div className="text-[11px] font-mono text-amber-400 mt-1">
            double perKm = 2.20; double total = 10.0;
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Açılış ücreti 10 TL olarak set edilir</div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Node 3: Scanner Input */}
        <div className="w-72 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center shadow-md">
          <div className="text-xs font-semibold text-white">Kullanıcıdan KM Verisi Oku</div>
          <div className="text-[11px] font-mono text-cyan-400 mt-1">
            km = scanner.nextDouble();
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            Mevcut Değer: {fare.km.toFixed(2)} KM
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Node 4: Raw Calculation */}
        <div className="w-72 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center shadow-md">
          <div className="text-xs font-semibold text-white">Ham Mesafe Ücreti Hesabı</div>
          <div className="text-[11px] font-mono text-amber-400 mt-1">
            total += (km * perKm);
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            Ham Tutar: 10 + ({fare.km.toFixed(2)} × 2.20) = {fare.rawFare.toFixed(2)} TL
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Node 5: Decision Diamond / Box */}
        <div className="w-80 p-4 rounded-xl bg-slate-950 border-2 border-amber-500/60 text-center shadow-lg relative">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>total &lt; 20.0 TL mi?</span>
          </div>
          <div className="text-[11px] text-slate-300 font-mono">
            {fare.rawFare.toFixed(2)} &lt; 20.00 TL ?
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-800">
            {/* True Branch */}
            <div
              className={`p-2 rounded-lg border text-left transition-all ${
                fare.isMinFareApplied
                  ? 'bg-amber-950/80 border-amber-500 text-white shadow-md'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                EVET (TRUE)
              </div>
              <div className="text-[11px] font-mono font-bold mt-0.5">total = 20.0;</div>
              <div className="text-[9px] mt-0.5">Taban ücret geçerli</div>
            </div>

            {/* False Branch */}
            <div
              className={`p-2 rounded-lg border text-left transition-all ${
                !fare.isMinFareApplied
                  ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                HAYIR (FALSE)
              </div>
              <div className="text-[11px] font-mono font-bold mt-0.5">total = total;</div>
              <div className="text-[9px] mt-0.5">Hesaplanan geçerli</div>
            </div>
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Node 6: Print Result */}
        <div className="w-72 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center shadow-md">
          <div className="text-xs font-semibold text-white">Ekrana Sonucu Yazdır</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 font-bold">
            Ödenecek: {fare.finalFare.toFixed(2)} TL
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">System.out.printf()</div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-600" />

        {/* Node 7: End */}
        <div className="w-56 px-4 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-center shadow-md">
          <div className="text-xs font-mono font-bold text-slate-300">BİTİR (End)</div>
          <div className="text-[10px] text-slate-500">Kaynaklar kapatılır</div>
        </div>
      </div>
    </div>
  );
};
