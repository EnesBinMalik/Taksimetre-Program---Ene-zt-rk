import React from 'react';
import { Download } from 'lucide-react';
import { JAVA_CODE_VERSIONS } from '../data/javaSnippets';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const downloadJavaFile = () => {
    const standardCode = JAVA_CODE_VERSIONS[0].code;
    const blob = new Blob([standardCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Taksimetre.java';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { id: 'simulator', label: 'Simülatör' },
    { id: 'code', label: 'Java Kodu' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'flowchart', label: 'Akış Şeması' },
    { id: 'report', label: 'Ödev Raporu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#simulator"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('simulator');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-amber-400 rounded-xs inline-block" />
          <span>Taksimetre Pro</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === item.id
                  ? 'border-amber-400 text-amber-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-100 hover:border-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={downloadJavaFile}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-sm active:scale-95"
            title="Taksimetre.java kaynak kod dosyasını bilgisayarına indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Taksimetre.java İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
