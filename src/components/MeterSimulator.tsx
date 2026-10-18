import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Check, Printer, Copy } from 'lucide-react';
import { calculateFare } from '../data/javaSnippets';
import { playMeterTick, playChime } from '../utils/audio';

interface MeterSimulatorProps {
  currentKm: number;
  setCurrentKm: React.Dispatch<React.SetStateAction<number>>;
}

export const MeterSimulator: React.FC<MeterSimulatorProps> = ({ currentKm, setCurrentKm }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const prevKmRef = useRef(currentKm);

  const fareData = calculateFare(currentKm);

  // Play tick sound when km increases
  useEffect(() => {
    if (soundEnabled && Math.abs(currentKm - prevKmRef.current) > 0.05) {
      playMeterTick();
    }
    prevKmRef.current = currentKm;
  }, [currentKm, soundEnabled]);

  // Live Ride Simulation interval
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentKm((prev) => {
        if (prev >= 60) {
          setIsPlaying(false);
          return 60;
        }
        const step = 0.1 * simSpeed;
        return Number((prev + step).toFixed(2));
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, simSpeed, setCurrentKm]);

  const handlePreset = (km: number) => {
    setIsPlaying(false);
    setCurrentKm(km);
    if (soundEnabled) playChime();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentKm(0);
    if (soundEnabled) playChime();
  };

  const copyReceiptText = () => {
    const text = `====================================
     TAKSİ YOLCULUK FİŞİ
  Geliştirici: Ene Öztürk
====================================
Tarih: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}
Açılış Ücreti     : 10.00 TL
Mesafe            : ${fareData.km.toFixed(2)} KM
KM Birim Fiyatı   : 2.20 TL/KM
Mesafe Tutarı     : ${(fareData.km * fareData.perKmFare).toFixed(2)} TL
Ham Hesaplanan    : ${fareData.rawFare.toFixed(2)} TL
Minimum Kuralı    : ${fareData.isMinFareApplied ? 'Uygulandı (Min 20.00 TL)' : 'Standart Tarife'}
------------------------------------
TOPLAM TUTAR      : ${fareData.finalFare.toFixed(2)} TL
====================================`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Simulation Stage & Controls Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Digital Taxi Meter Hardware Unit */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            {/* Meter Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
                  TAKSİMETRE ENSTRÜMANI
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-1.5 rounded-md text-xs transition-colors flex items-center gap-1 ${
                    soundEnabled ? 'text-amber-400 bg-amber-950/40 border border-amber-800/60' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={soundEnabled ? 'Sayaç Sesini Kapat' : 'Sayaç Sesini Aç'}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span className="text-[11px] font-mono">{soundEnabled ? 'SES AÇIK' : 'SES KAPALI'}</span>
                </button>
                <span className="text-xs font-mono text-slate-500">ENE ÖZTÜRK v1.0</span>
              </div>
            </div>

            {/* Main Digital Display Pane (Amber OLED Glow) */}
            <div className="mt-6 p-6 rounded-xl bg-black border-2 border-slate-800 shadow-inner relative">
              <div className="absolute top-3 right-4 flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wider text-slate-500">DURUM:</span>
                <span
                  className={`text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                    fareData.isMinFareApplied
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-700/50'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                  }`}
                >
                  {fareData.isMinFareApplied ? 'MİNİMUM TABAN ÜCRET (20 TL)' : 'KM TARİFESİ AKTİF'}
                </span>
              </div>

              <div className="pt-4 pb-2">
                <div className="text-xs font-mono tracking-widest text-amber-400/70 uppercase">
                  ÖDENECEK TOPLAM TUTAR
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-amber-400 tabular-nums drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]">
                    {fareData.finalFare.toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold font-mono text-amber-400/80">TL</span>
                </div>
              </div>

              {/* Sub-meters: KM, Per KM, Base Fare */}
              <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-slate-800/80 text-left">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">MESAFE (KM)</div>
                  <div className="text-lg font-mono font-bold text-white tabular-nums">
                    {fareData.km.toFixed(2)} <span className="text-xs text-slate-500 font-sans">km</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">AÇILIŞ ÜCRETİ</div>
                  <div className="text-lg font-mono font-bold text-slate-300 tabular-nums">
                    {fareData.baseFare.toFixed(2)} <span className="text-xs text-slate-500 font-sans">TL</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">KM BİRİM FİYAT</div>
                  <div className="text-lg font-mono font-bold text-slate-300 tabular-nums">
                    {fareData.perKmFare.toFixed(2)} <span className="text-xs text-slate-500 font-sans">TL</span>
                  </div>
                </div>
              </div>

              {/* Mathematical Subtext if Min Fare is applied */}
              {fareData.isMinFareApplied && (
                <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-amber-300/90 font-mono">
                  Ham hesap: 10 + ({fareData.km.toFixed(2)} × 2.20) = {fareData.rawFare.toFixed(2)} TL &lt; 20 TL olduğu için taban 20.00 TL alındı.
                </div>
              )}
            </div>

            {/* Animated Road Simulation Visualizer */}
            <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800/80 p-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-medium text-slate-300">Yolculuk Simülasyonu</span>
                <span className="font-mono text-amber-400">{fareData.km.toFixed(1)} KM tamamlandı</span>
              </div>

              {/* Road Graphic */}
              <div className="h-16 bg-slate-900 rounded-lg relative overflow-hidden flex items-center border border-slate-800">
                {/* Moving road stripes */}
                <div
                  className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-40"
                  style={{
                    background: isPlaying
                      ? 'repeating-linear-gradient(90deg, #64748b 0, #64748b 20px, transparent 20px, transparent 40px)'
                      : 'repeating-linear-gradient(90deg, #475569 0, #475569 20px, transparent 20px, transparent 40px)',
                    animation: isPlaying ? `moveRoad ${1 / simSpeed}s linear infinite` : 'none',
                  }}
                />

                {/* Animated Yellow Taxi Car */}
                <div
                  className="relative z-10 transition-all duration-300 ease-out"
                  style={{
                    left: `${Math.min(88, Math.max(5, (currentKm / 50) * 85))}%`,
                  }}
                >
                  <div className="relative">
                    {/* Roof Taxi Light */}
                    <div className="w-4 h-1.5 bg-amber-400 rounded-xs mx-auto shadow-[0_0_8px_#f59e0b] -mb-0.5" />
                    {/* Car Body */}
                    <div className="w-14 h-6 bg-amber-500 rounded-md border border-amber-300 flex items-center justify-between px-1 shadow-md">
                      <div className="w-3 h-2.5 bg-slate-900 rounded-xs opacity-75" />
                      <span className="text-[8px] font-black font-mono text-slate-950">TAKSİ</span>
                      <div className="w-3 h-2.5 bg-slate-900 rounded-xs opacity-75" />
                    </div>
                    {/* Wheels */}
                    <div className="flex justify-between px-1 -mt-1">
                      <div className={`w-3 h-3 bg-slate-950 rounded-full border border-slate-700 ${isPlaying ? 'animate-spin' : ''}`} />
                      <div className={`w-3 h-3 bg-slate-950 rounded-full border border-slate-700 ${isPlaying ? 'animate-spin' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Controls Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      isPlaying
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Yolculuğu Duraklat' : 'Canlı Sürüş Başlat'}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    title="Mesafeyi 0 KM'ye sıfırla"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Sıfırla</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="text-slate-500 font-mono">Hız:</span>
                  {[1, 2, 5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setSimSpeed(speed)}
                      className={`px-2 py-0.5 rounded text-xs font-mono font-medium transition-colors ${
                        simSpeed === speed ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive KM Input & Slider Controls */}
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="km-slider" className="text-sm font-semibold text-white">
                  Mesafe Ayarı (Kilometre)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="km-numeric-input"
                    type="number"
                    min="0"
                    max="1000"
                    step="0.1"
                    value={currentKm}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setCurrentKm(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-24 px-2.5 py-1 text-sm font-mono font-bold text-right bg-slate-950 border border-slate-700 rounded-lg text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs font-mono text-slate-400">KM</span>
                </div>
              </div>

              {/* Slider with clear tick markers */}
              <input
                id="km-slider"
                type="range"
                min="0"
                max="50"
                step="0.1"
                value={currentKm > 50 ? 50 : currentKm}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentKm(parseFloat(e.target.value));
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>0 KM (Başlangıç)</span>
                <span>4.55 KM (Eşik)</span>
                <span>15 KM</span>
                <span>30 KM</span>
                <span>50 KM</span>
              </div>

              {/* Step Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {[
                  { label: '-1 KM', delta: -1 },
                  { label: '+0.5 KM', delta: 0.5 },
                  { label: '+1 KM', delta: 1 },
                  { label: '+5 KM', delta: 5 },
                  { label: '+10 KM', delta: 10 },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentKm(Number(Math.max(0, currentKm + btn.delta).toFixed(2)));
                    }}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Preset Test Scenarios */}
              <div className="pt-2">
                <div className="text-xs font-medium text-slate-400 mb-2">Hızlı Test Senaryoları:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handlePreset(0)}
                    className="p-2 text-left rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-xs font-bold text-white">0 KM</div>
                    <div className="text-[11px] text-amber-400 font-mono">20.00 TL</div>
                    <div className="text-[10px] text-slate-500">Açılışta inildi</div>
                  </button>

                  <button
                    onClick={() => handlePreset(2)}
                    className="p-2 text-left rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-xs font-bold text-white">2.0 KM</div>
                    <div className="text-[11px] text-amber-400 font-mono">20.00 TL</div>
                    <div className="text-[10px] text-slate-500">Kısa mesafe (14.4 TL)</div>
                  </button>

                  <button
                    onClick={() => handlePreset(4.55)}
                    className="p-2 text-left rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-xs font-bold text-white">4.55 KM</div>
                    <div className="text-[11px] text-amber-400 font-mono">20.01 TL</div>
                    <div className="text-[10px] text-slate-500">Min sınır eşiği</div>
                  </button>

                  <button
                    onClick={() => handlePreset(10)}
                    className="p-2 text-left rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-xs font-bold text-white">10.0 KM</div>
                    <div className="text-[11px] text-amber-400 font-mono">32.00 TL</div>
                    <div className="text-[10px] text-slate-500">Standart tarife</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Mathematical Decomposition & Authentic Receipt */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step-by-step Math Decomposition */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Adım Adım Hesaplama Mantığı
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Java programının arka planda yürüttüğü matematiksel işlem adımları:
            </p>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">1. Açılış Ücreti (Sabit)</span>
                  <span className="font-mono text-white font-bold">10.00 TL</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Sayaç çalıştığı anda total değişkenine 10.0 atanır.
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">2. Mesafe Ücreti</span>
                  <span className="font-mono text-white font-bold">
                    {(fareData.km * fareData.perKmFare).toFixed(2)} TL
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  {fareData.km.toFixed(2)} KM × 2.20 TL/KM
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">3. Ham Toplam Tutar</span>
                  <span className="font-mono text-white font-bold">
                    {fareData.rawFare.toFixed(2)} TL
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  10.00 TL + {(fareData.km * fareData.perKmFare).toFixed(2)} TL
                </div>
              </div>

              {/* Step 4: Ternary check */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-amber-900/40">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-amber-400">4. Koşullu Kontrol (Ternary)</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {fareData.finalFare.toFixed(2)} TL
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 font-mono text-xs text-slate-300 mt-1">
                  total = (total &lt; 20.0) ? 20.0 : total;
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Durum:{' '}
                  <span className="font-semibold text-white">
                    {fareData.rawFare.toFixed(2)} &lt; 20.00
                  </span>{' '}
                  şartı{' '}
                  <span className={fareData.isMinFareApplied ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {fareData.isMinFareApplied ? 'DOĞRU (True)' : 'YANLIŞ (False)'}
                  </span>
                  . {fareData.isMinFareApplied ? 'Bu sebeple 20 TL taban ücret uygulanır.' : 'Hesaplanan tutar 20 TL üzerinde olduğu için aynen alınır.'}
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Digital Receipt Slip */}
          <div className="rounded-2xl bg-slate-100 text-slate-900 p-6 shadow-xl relative font-mono text-xs border border-slate-300">
            <div className="text-center pb-3 border-b border-dashed border-slate-400">
              <div className="font-bold text-sm tracking-wider uppercase">TAKSİ YOLCULUK FİŞİ</div>
              <div className="text-[11px] text-slate-600 mt-0.5">GELİŞTİRİCİ: ENE ÖZTÜRK</div>
              <div className="text-[10px] text-slate-500">Java 101 Bitirme Projesi</div>
            </div>

            <div className="py-3 space-y-1.5 border-b border-dashed border-slate-400 text-[11px]">
              <div className="flex justify-between">
                <span>Tarih & Saat:</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString('tr-TR')} {new Date().toLocaleTimeString('tr-TR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Açılış Ücreti:</span>
                <span className="font-medium">10.00 TL</span>
              </div>
              <div className="flex justify-between">
                <span>Mesafe:</span>
                <span className="font-medium">{fareData.km.toFixed(2)} KM</span>
              </div>
              <div className="flex justify-between">
                <span>KM Birim Tarife:</span>
                <span className="font-medium">2.20 TL</span>
              </div>
              <div className="flex justify-between">
                <span>Mesafe Tutarı:</span>
                <span className="font-medium">{(fareData.km * fareData.perKmFare).toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between">
                <span>Ham Tutar:</span>
                <span className="font-medium">{fareData.rawFare.toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Taban Kuralı:</span>
                <span className="font-semibold text-slate-950">
                  {fareData.isMinFareApplied ? '20.00 TL (Uygulandı)' : 'Aşıldı (Standart)'}
                </span>
              </div>
            </div>

            <div className="pt-3 pb-2 flex items-baseline justify-between font-bold text-sm">
              <span className="tracking-wide uppercase">ÖDENECEK TOPLAM:</span>
              <span className="text-lg tabular-nums">{fareData.finalFare.toFixed(2)} TL</span>
            </div>

            <div className="pt-3 border-t border-dashed border-slate-400 text-center text-[10px] text-slate-500">
              *** İyi Yolculuklar Dileriz ***
              <br />
              İmza: Ene Öztürk (El Emeği Kod)
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between gap-2 no-print">
              <button
                onClick={copyReceiptText}
                className="flex items-center justify-center gap-1.5 flex-1 px-3 py-1.5 text-xs font-semibold rounded bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
              >
                {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReceipt ? 'Kopyalandı' : 'Fişi Kopyala'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-1.5 flex-1 px-3 py-1.5 text-xs font-semibold rounded bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Yazdır / PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
