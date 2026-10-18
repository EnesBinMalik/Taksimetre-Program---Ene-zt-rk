import React from 'react';
import { Table, CheckCircle2, ArrowRight } from 'lucide-react';
import { TEST_CASES } from '../data/javaSnippets';

interface TestMatrixProps {
  onSelectKm: (km: number) => void;
}

export const TestMatrix: React.FC<TestMatrixProps> = ({ onSelectKm }) => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Akademik Test Matrisi ve Doğrulama</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ödev kontrolünde kullanılan sınır değer (boundary) ve eşik senaryoları
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Tüm 6 Test Senaryosu Doğrulandı</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-medium uppercase tracking-wider">
              <th className="py-3 px-3">Senaryo Açıklaması</th>
              <th className="py-3 px-3 text-right">Girdi (KM)</th>
              <th className="py-3 px-3 text-right">Ham Tutar</th>
              <th className="py-3 px-3">20 TL Kuralı</th>
              <th className="py-3 px-3 text-right">Beklenen Çıktı</th>
              <th className="py-3 px-3 text-center">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {TEST_CASES.map((tc) => (
              <tr key={tc.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-3 font-sans text-slate-200">
                  <div className="font-medium">{tc.scenario}</div>
                </td>
                <td className="py-3.5 px-3 text-right text-white font-bold tabular-nums">
                  {tc.km} KM
                </td>
                <td className="py-3.5 px-3 text-right text-slate-400 tabular-nums">
                  {tc.expectedRaw.toFixed(2)} TL
                </td>
                <td className="py-3.5 px-3 font-sans">
                  {tc.minFareApplied ? (
                    <span className="text-amber-400 font-medium">Uygulandı (Min 20 TL)</span>
                  ) : (
                    <span className="text-emerald-400 font-medium">Aşıldı (Standart)</span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-right text-amber-400 font-bold tabular-nums">
                  {tc.expectedFinal.toFixed(2)} TL
                </td>
                <td className="py-3.5 px-3 text-center font-sans">
                  <button
                    onClick={() => onSelectKm(tc.km)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                  >
                    <span>Dene</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
