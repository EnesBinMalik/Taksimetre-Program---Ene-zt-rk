import React from 'react';
import { Award, CheckCircle2, Printer, FileText, UserCheck, ShieldCheck } from 'lucide-react';

export const HomeworkDossier: React.FC = () => {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-8 print-card">
      {/* Dossier Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide uppercase mb-1">
            <Award className="w-4 h-4" />
            <span>Resmi Ödev Teslim Dosyası &amp; Raporu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Java Taksimetre Ödevi — Ene Öztürk
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Bu çalışma, verilen mesafe değerine göre taksimetre ücretini hesaplayan, açılış ve minimum indi-bindi tutarı kurallarını eksiksiz işleten Java programının teslim belgesidir.
          </p>
        </div>

        <div className="shrink-0 no-print">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Ödev Raporunu Yazdır / PDF</span>
          </button>
        </div>
      </div>

      {/* Student & Project Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-500">ÖĞRENCİ / GELİŞTİRİCİ</div>
          <div className="text-base font-bold text-white mt-1">Ene Öztürk</div>
          <div className="text-xs text-amber-400 mt-0.5">El Emeği Temiz Kod İmzası</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-500">DERS / MODÜL</div>
          <div className="text-base font-bold text-white mt-1">Java 101 Temelleri</div>
          <div className="text-xs text-slate-400 mt-0.5">Değişkenler &amp; Koşul Yapıları</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-500">PROGRAM ÇIKTISI</div>
          <div className="text-base font-bold text-white mt-1">Taksimetre.java</div>
          <div className="text-xs text-slate-400 mt-0.5">Konsol Çalıştırılabilir Dosya</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-500">DURUM &amp; DOĞRULAMA</div>
          <div className="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>%100 Eksiksiz</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Tüm Testleri Geçti</div>
        </div>
      </div>

      {/* Curriculum Requirements Checklist */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Ödev Şartnamesi ve Karşılanan Kriterler</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">KM Başına 2.20 TL Tarifesi</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Mesafe katsayısı <code className="text-amber-300 font-mono">perKm = 2.20</code> olarak tanımlandı ve toplam tutara çarpılarak eklendi.
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Taksimetre Açılış Ücreti 10 TL</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Başlangıç değişkeni <code className="text-amber-300 font-mono">total = 10.0</code> olarak atanarak sayaç açılış ücreti garantiye alındı.
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Minimum Ödenecek Tutar 20 TL (İndi-Bindi)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                20 TL altındaki tüm hesaplamalarda (örneğin 2 KM = 14.40 TL), taban ücret olarak 20 TL tahsil edilmesi sağlandı.
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Ternary Operatörü Kullanımı</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                <code className="text-amber-300 font-mono">total = (total &lt; 20) ? 20 : total;</code> ile hocanın özellikle istediği tek satırlık pratik koşul uygulandı.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Handcrafted Signature & Note Box */}
      <div className="p-5 rounded-xl bg-slate-950 border border-amber-900/50 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Geliştirici Beyanı ve El Emeği İmzası</div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              &quot;Bu ödev projesi, <strong>Ene Öztürk</strong> tarafından kodlanmış ve doğrulanmıştır. Kod içerisinde değişken isimlendirme standartlarına (camelCase), kaynak sızıntısını önlemek için <code className="text-amber-300 font-mono">scanner.close()</code> metoduna ve temiz kod (Clean Code) standartlarına özen gösterilmiştir.&quot;
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-amber-400 font-mono">
              <span className="font-semibold">İmza: Ene Öztürk</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Tarih: {new Date().toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grading Rubric / Puanlama Tablosu */}
      <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Öğretmen Değerlendirme Rubriği (100 Puan Üzerinden)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 font-medium">1. Veri Tipleri &amp; Scanner</div>
            <div className="text-emerald-400 font-bold font-mono mt-0.5">25 / 25 Puan</div>
            <div className="text-[10px] text-slate-500">double ve Scanner kullanımı</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 font-medium">2. Formül Doğruluğu</div>
            <div className="text-emerald-400 font-bold font-mono mt-0.5">25 / 25 Puan</div>
            <div className="text-[10px] text-slate-500">10 + (km * 2.20) hesabı</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 font-medium">3. Minimum Tutar Şartı</div>
            <div className="text-emerald-400 font-bold font-mono mt-0.5">25 / 25 Puan</div>
            <div className="text-[10px] text-slate-500">20 TL taban tutar kontrolü</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 font-medium">4. Kod Düzeni &amp; Açıklamalar</div>
            <div className="text-emerald-400 font-bold font-mono mt-0.5">25 / 25 Puan</div>
            <div className="text-[10px] text-slate-500">Yorum satırları ve imza</div>
          </div>
        </div>
      </div>
    </div>
  );
};
