import React, { useState } from 'react';
import { Copy, Check, Download, Code2, BookOpen } from 'lucide-react';
import { JAVA_CODE_VERSIONS } from '../data/javaSnippets';

export const JavaCodeViewer: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet =
    JAVA_CODE_VERSIONS.find((v) => v.id === selectedVersion) || JAVA_CODE_VERSIONS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeSnippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeSnippet.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
      {/* Code Header & Tab Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Java Kaynak Kodları (Ene Öztürk)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ödev için hazırlanmış, açıklamalı ve derlemeye hazır Java kodları
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Kodu Kopyala'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{activeSnippet.filename} İndir</span>
          </button>
        </div>
      </div>

      {/* Code Version Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {JAVA_CODE_VERSIONS.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedVersion(v.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedVersion === v.id
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {v.title}
          </button>
        ))}
      </div>

      {/* Description of Selected Version */}
      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">Çözüm Notu:</span> {activeSnippet.description}
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="rounded-xl bg-black border border-slate-800 overflow-hidden shadow-2xl">
        <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs font-mono text-slate-400">
          <span>{activeSnippet.filename}</span>
          <span>Java SE 17 / 21 Uyumlu</span>
        </div>

        <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[500px] select-text">
          <code>{activeSnippet.code}</code>
        </pre>
      </div>

      {/* Technical Code Analysis / Pedagogical Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            Scanner Sınıfı ile Girdi Alma
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Java&apos;nın standart <code className="text-amber-300 font-mono">java.util.Scanner</code> paketi kullanılarak kullanıcıdan konsol üzerinden ondalıklı (<code className="text-amber-300 font-mono">double</code>) mesafe değeri güvenle okunur.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            Ternary (Üçlü Şart) Operatörü
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            <code className="text-amber-300 font-mono">total = (total &lt; 20.0) ? 20.0 : total;</code> ifadesi ile tek satırda temiz, okunabilir ve hızlı bir alt sınır doğrulaması gerçekleştirilir.
          </p>
        </div>
      </div>
    </div>
  );
};
