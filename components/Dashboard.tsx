
import React, { useMemo } from 'react';
import { HistoryResult } from '../types';

interface DashboardProps {
  history: HistoryResult[];
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ history, onClose }) => {
  const avgWpm = history.length > 0 ? Math.round(history.reduce((acc, curr) => acc + curr.wpm, 0) / history.length) : 0;
  const bestWpm = history.length > 0 ? Math.max(...history.map(h => h.wpm)) : 0;
  const avgAcc = history.length > 0 ? Math.round(history.reduce((acc, curr) => acc + curr.accuracy, 0) / history.length) : 0;

  const problemChars = useMemo(() => {
    const counts: Record<string, number> = {};
    history.forEach(res => {
      if (res.missedChars) {
        Object.entries(res.missedChars).forEach(([char, count]) => {
          counts[char] = (counts[char] || 0) + count;
        });
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [history]);

  const getPoints = () => {
    if (history.length < 2) return "";
    const width = 400;
    const height = 100;
    const values = history.map(h => h.wpm);
    const maxVal = Math.max(...values, 100);
    const minVal = Math.min(...values, 0);
    const range = maxVal - minVal || 1;
    const step = width / (history.length - 1);
    
    return history.map((h, i) => {
        const x = i * step;
        const y = height - ((h.wpm - minVal) / range) * height;
        return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="fixed inset-0 bg-[#323437]/98 backdrop-blur-2xl z-[250] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-[1200px] w-full bg-[#2c2e31] border border-white/10 rounded-[3.5rem] p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] overflow-hidden relative">
        <button onClick={onClose} className="absolute top-12 right-12 text-[#646669] hover:text-[#e2b714] transition-all hover:rotate-90">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-[#d1d0c5] text-5xl font-black mb-2 tracking-tighter">Performance Matrix</h2>
            <p className="text-[#646669] text-sm font-bold uppercase tracking-[0.4em]">Comprehensive diagnostics for your typing evolution</p>
          </div>
          <div className="text-right">
             <span className="text-[#646669] text-[10px] font-black uppercase block mb-1">Status</span>
             <span className="text-[#10b981] text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#10b981]/10 rounded-full border border-[#10b981]/20">Active Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <CompactStat label="Mean Speed" value={avgWpm} unit="WPM" color="#e2b714" />
          <CompactStat label="Peak Flow" value={bestWpm} unit="WPM" color="#d1d0c5" />
          <CompactStat label="Mean Accuracy" value={avgAcc} unit="%" color="#ca4754" />
          <CompactStat label="Experience" value={history.length} unit="Tests" color="#646669" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-grow overflow-hidden">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col flex-grow">
                <h3 className="text-[#646669] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Evolution Graph (WPM Over Time)</h3>
                <div className="bg-[#323437]/50 rounded-[2.5rem] p-10 border border-white/5 flex-grow relative flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#e2b714]/5 to-transparent pointer-events-none" />
                    {history.length > 1 ? (
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#e2b714" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#e2b714" />
                                </linearGradient>
                            </defs>
                            <polyline fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={getPoints()} className="drop-shadow-[0_0_10px_rgba(226,183,20,0.3)]"/>
                        </svg>
                    ) : <span className="text-[#646669] italic text-sm">Consistent practice builds meaningful metrics...</span>}
                </div>
            </div>

            <div className="flex flex-col">
                <h3 className="text-[#ca4754] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Target Weaknesses (High-Frequency Errors)</h3>
                <div className="grid grid-cols-5 gap-4">
                  {problemChars.length > 0 ? problemChars.map(([char, count]) => (
                    <div key={char} className="bg-[#ca4754]/5 border border-[#ca4754]/20 p-4 rounded-2xl flex flex-col items-center group hover:bg-[#ca4754]/10 transition-colors">
                      <span className="text-[#ca4754] text-2xl font-black font-mono mb-1">{char === ' ' ? '␣' : char}</span>
                      <span className="text-[#646669] text-[9px] font-black uppercase">{count} Misses</span>
                    </div>
                  )) : <div className="col-span-5 text-[#646669] italic text-xs p-6 bg-white/5 rounded-2xl text-center border border-dashed border-white/10">No specific weaknesses detected in current sample.</div>}
                </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col overflow-hidden">
            <h3 className="text-[#646669] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Session Log</h3>
            <div className="overflow-y-auto custom-scrollbar flex-grow bg-[#323437]/30 rounded-[2.5rem] p-8 border border-white/5 shadow-inner">
              <div className="space-y-4">
                  {[...history].reverse().map(res => (
                    <div key={res.id} className="group flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all">
                        <div>
                            <span className="text-[#d1d0c5] text-lg font-black mr-2">{res.wpm}</span>
                            <span className="text-[#646669] text-[10px] font-bold uppercase">{res.accuracy}% Acc</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[#646669] text-[9px] font-black block leading-none">{new Date(res.timestamp).toLocaleDateString()}</span>
                            <span className="text-[#e2b714] text-[8px] uppercase font-bold tracking-widest">{res.category}</span>
                        </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompactStat = ({ label, value, unit, color }: { label: string, value: string | number, unit: string, color: string }) => (
  <div className="bg-[#323437]/50 border border-white/5 p-8 rounded-[2rem] flex flex-col items-center relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    <span className="text-[#646669] text-[9px] font-black uppercase tracking-[0.3em] mb-2">{label}</span>
    <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black" style={{ color }}>{value}</span>
        <span className="text-[10px] font-black text-[#646669] uppercase">{unit}</span>
    </div>
  </div>
);

export default Dashboard;
