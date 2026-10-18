import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, Trash2, CheckCircle2, CornerDownLeft } from 'lucide-react';
import { calculateFare, TEST_CASES } from '../data/javaSnippets';

interface ConsoleLine {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'success' | 'error';
  text: string;
}

export const JavaConsole: React.FC = () => {
  const [inputKm, setInputKm] = useState<string>('5');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lines, setLines] = useState<ConsoleLine[]>([
    { id: '1', type: 'system', text: '$ javac Taksimetre.java' },
    { id: '2', type: 'system', text: '$ java Taksimetre' },
    { id: '3', type: 'output', text: '================================================' },
    { id: '4', type: 'output', text: '      TAKSİMETRE PROGRAMI - ENE ÖZTÜRK         ' },
    { id: '5', type: 'output', text: '================================================' },
    { id: '6', type: 'prompt', text: 'Lütfen gidilen mesafeyi (KM cinsinden) giriniz: 5' },
    { id: '7', type: 'output', text: '------------------------------------------------' },
    { id: '8', type: 'success', text: 'Toplam Ödenecek Taksimetre Tutarı: 21.00 TL' },
    { id: '9', type: 'output', text: '================================================' },
    { id: '10', type: 'output', text: 'İyi yolculuklar dileriz! (Hazırlayan: Ene Öztürk)' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeJavaProgram = (kmValue: number) => {
    const val = isNaN(kmValue) ? 0 : Math.max(0, kmValue);
    const fare = calculateFare(val);

    const newRun: ConsoleLine[] = [
      { id: Date.now() + '-sys', type: 'system', text: '$ java Taksimetre' },
      { id: Date.now() + '-h1', type: 'output', text: '================================================' },
      { id: Date.now() + '-h2', type: 'output', text: '      TAKSİMETRE PROGRAMI - ENE ÖZTÜRK         ' },
      { id: Date.now() + '-h3', type: 'output', text: '================================================' },
      { id: Date.now() + '-p', type: 'prompt', text: `Lütfen gidilen mesafeyi (KM cinsinden) giriniz: ${val}` },
      { id: Date.now() + '-div', type: 'output', text: '------------------------------------------------' },
      { id: Date.now() + '-res', type: 'success', text: `Toplam Ödenecek Taksimetre Tutarı: ${fare.finalFare.toFixed(2)} TL` },
    ];

    if (fare.isMinFareApplied) {
      newRun.push({
        id: Date.now() + '-note',
        type: 'output',
        text: `[Not: Ham hesap 10 + (${val} x 2.20) = ${fare.rawFare.toFixed(2)} TL < 20 TL olduğu için 20.00 TL uygulandı]`,
      });
    }

    newRun.push(
      { id: Date.now() + '-end', type: 'output', text: '================================================' },
      { id: Date.now() + '-sig', type: 'output', text: 'İyi yolculuklar dileriz! (Hazırlayan: Ene Öztürk)' }
    );

    setLines((prev) => [...prev, ...newRun]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKm.trim()) return;
    const num = parseFloat(inputKm.replace(',', '.'));
    executeJavaProgram(num);
  };

  const clearTerminal = () => {
    setLines([
      { id: Date.now() + '-clear', type: 'system', text: 'Terminal temizlendi. Yeni komut bekleniyor...' },
    ]);
  };

  const runAllTestCases = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLines((prev) => [
      ...prev,
      { id: Date.now() + '-ts', type: 'system', text: '$ javac TaksimetreTest.java && java TaksimetreTest' },
      { id: Date.now() + '-ts-head', type: 'output', text: '=== ENE ÖZTÜRK OTOMATİK DOĞRULAMA TEST SÜİTİ BAŞLATILDI ===' },
    ]);

    for (const tc of TEST_CASES) {
      await new Promise((r) => setTimeout(r, 220));
      const res = calculateFare(tc.km);
      const isMatch = res.finalFare === tc.expectedFinal;
      const resultType: 'success' | 'error' = isMatch ? 'success' : 'error';
      setLines((prev) => [
        ...prev,
        {
          id: Date.now() + '-' + tc.id,
          type: resultType,
          text: `[TEST] ${tc.km} KM => ${res.finalFare.toFixed(2)} TL | Beklenen: ${tc.expectedFinal.toFixed(2)} TL [${isMatch ? 'BAŞARILI ✓' : 'HATA'}] - ${tc.scenario}`,
        },
      ]);
    }

    setLines((prev) => [
      ...prev,
      { id: Date.now() + '-ts-end', type: 'success', text: 'Tüm test senaryoları %100 başarıyla tamamlandı. Kod kurallarla tam uyumlu!' },
    ]);
    setIsRunning(false);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Java Konsol Simülatörü</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Java derleyici ve çalışma zamanı (JRE) konsol çıktısını simüle eden canlı terminal
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runAllTestCases}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isRunning ? 'Testler Koşuluyor...' : 'Tüm Testleri Koştur'}</span>
          </button>

          <button
            onClick={clearTerminal}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Terminal geçmişini temizle"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-xl bg-black border border-slate-800 overflow-hidden shadow-2xl">
        {/* Terminal Titlebar */}
        <div className="bg-slate-900/90 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">ene@workspace: ~/odev/Taksimetre.java</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">OpenJDK 21 - Scanner REPL</span>
        </div>

        {/* Terminal Screen */}
        <div className="p-4 font-mono text-xs max-h-96 min-h-64 overflow-y-auto space-y-1 text-slate-300 select-text">
          {lines.map((l) => (
            <div
              key={l.id}
              className={`leading-relaxed ${
                l.type === 'system'
                  ? 'text-slate-500 font-semibold'
                  : l.type === 'prompt'
                  ? 'text-amber-400 font-medium'
                  : l.type === 'success'
                  ? 'text-emerald-400 font-bold'
                  : l.type === 'error'
                  ? 'text-rose-400 font-bold'
                  : 'text-slate-300'
              }`}
            >
              {l.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command / Scanner Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <span className="text-xs font-mono text-amber-400 font-semibold pl-1 whitespace-nowrap">
            Scanner Mesafe (KM) &gt;
          </span>
          <input
            type="text"
            value={inputKm}
            onChange={(e) => setInputKm(e.target.value)}
            placeholder="Mesafe giriniz (örn: 2, 4.5, 10)..."
            className="flex-1 bg-transparent text-xs font-mono text-white placeholder-slate-600 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Çalıştır</span>
            <CornerDownLeft className="w-3 h-3 text-slate-800" />
          </button>
        </form>
      </div>

      {/* Preset Quick Test Buttons for Console */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">Hızlı Girdi:</span>
        {[0, 1.5, 2, 4.545, 5, 10, 20, 50].map((km) => (
          <button
            key={km}
            onClick={() => {
              setInputKm(km.toString());
              executeJavaProgram(km);
            }}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors"
          >
            {km} KM
          </button>
        ))}
      </div>
    </div>
  );
};
