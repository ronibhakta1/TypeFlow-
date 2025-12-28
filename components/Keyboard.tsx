
import React from 'react';
import { KEYBOARD_ROWS } from '../constants';

interface KeyboardProps {
  activeKey: string;
}

const FINGER_COLORS = {
  lp: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
  lr: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  lm: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  li: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  t: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  ri: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  rm: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  rr: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  rp: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
};

const ACTIVE_COLORS = {
  lp: 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)]',
  lr: 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]',
  lm: 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]',
  li: 'bg-yellow-500 text-[#323437] shadow-[0_0_20px_rgba(234,179,8,0.6)]',
  t: 'bg-emerald-500 text-[#323437] shadow-[0_0_20px_rgba(16,185,129,0.6)]',
  ri: 'bg-yellow-500 text-[#323437] shadow-[0_0_20px_rgba(234,179,8,0.6)]',
  rm: 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]',
  rr: 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]',
  rp: 'bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)]',
};

const HEX_COLORS = {
  lp: '#ec4899', lr: '#3b82f6', lm: '#a855f7', li: '#eab308', t: '#10b981',
  ri: '#eab308', rm: '#a855f7', rr: '#3b82f6', rp: '#ec4899'
};

const LEGEND_DATA = [
  { key: 'lp', label: 'L. PINKY' },
  { key: 'lr', label: 'L. RING' },
  { key: 'lm', label: 'L. MIDDLE' },
  { key: 'li', label: 'L. INDEX' },
  { key: 't', label: 'THUMBS' },
  { key: 'ri', label: 'R. INDEX' },
  { key: 'rm', label: 'R. MIDDLE' },
  { key: 'rr', label: 'R. RING' },
  { key: 'rp', label: 'R. PINKY' },
];

const SYMBOL_MAP: { [key: string]: string } = {
  '`': '~', '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')', '-': '_', '=': '+',
  '[': '{', ']': '}', '\\': '|', ';': ':', "'": '"', ',': '<', '.': '>', '/': '?'
};

const getFinger = (key: string): keyof typeof FINGER_COLORS => {
  const k = key.toLowerCase();
  if (['1', '!', 'q', 'a', 'z', '`', '~', 'tab', 'caps', 'shift', 'backspace'].includes(k)) return 'lp';
  if (['2', '@', 'w', 's', 'x'].includes(k)) return 'lr';
  if (['3', '#', 'e', 'd', 'c'].includes(k)) return 'lm';
  if (['4', '$', '5', '%', 'r', 't', 'f', 'g', 'v', 'b'].includes(k)) return 'li';
  if (['space', 'alt', 'ctrl', 'fn', 'meta', ' '].includes(k)) return 't';
  if (['6', '^', '7', '&', 'y', 'u', 'h', 'j', 'n', 'm'].includes(k)) return 'ri';
  if (['8', '*', 'i', 'k', ',', '<'].includes(k)) return 'rm';
  if (['9', '(', 'o', 'l', '.', '>'].includes(k)) return 'rr';
  if (['0', ')', '-', '_', '=', '+', 'p', '[', '{', ']', '}', '\\', '|', ';', ':', "'", '"', 'enter', '/', '?'].includes(k)) return 'rp';
  return 'lp';
};

const HandSVG: React.FC<{ activeFinger: keyof typeof FINGER_COLORS }> = ({ activeFinger }) => {
  const getFill = (finger: keyof typeof FINGER_COLORS) => activeFinger === finger ? HEX_COLORS[finger] : 'transparent';
  const getStroke = (finger: keyof typeof FINGER_COLORS) => activeFinger === finger ? '#ffffff' : '#4b4d50';

  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-lg mx-auto transition-all duration-300 h-28" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(150, 20)">
        <path d="M50,150 Q10,150 10,110 L10,60 Q10,40 40,40 L90,40 Q120,40 120,60 L120,150 Z" fill="transparent" stroke="#4b4d50" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />
        <rect x="10" y="30" width="22" height="60" rx="11" fill={getFill('lp')} stroke={getStroke('lp')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="37" y="15" width="22" height="75" rx="11" fill={getFill('lr')} stroke={getStroke('lr')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="64" y="10" width="22" height="85" rx="11" fill={getFill('lm')} stroke={getStroke('lm')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="91" y="20" width="22" height="75" rx="11" fill={getFill('li')} stroke={getStroke('li')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="125" y="100" width="45" height="22" rx="11" fill={getFill('t')} stroke={getStroke('t')} strokeWidth="2" className="transition-all duration-150" />
      </g>
      <g transform="translate(350, 20)">
        <path d="M70,150 Q110,150 110,110 L110,60 Q110,40 80,40 L30,40 Q0,40 0,60 L0,150 Z" fill="transparent" stroke="#4b4d50" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />
        <rect x="88" y="30" width="22" height="60" rx="11" fill={getFill('rp')} stroke={getStroke('rp')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="61" y="15" width="22" height="75" rx="11" fill={getFill('rr')} stroke={getStroke('rr')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="34" y="10" width="22" height="85" rx="11" fill={getFill('rm')} stroke={getStroke('rm')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="7" y="20" width="22" height="75" rx="11" fill={getFill('ri')} stroke={getStroke('ri')} strokeWidth="2" className="transition-all duration-150" />
        <rect x="-50" y="100" width="45" height="22" rx="11" fill={getFill('t')} stroke={getStroke('t')} strokeWidth="2" className="transition-all duration-150" />
      </g>
    </svg>
  );
};

const Keyboard: React.FC<KeyboardProps> = ({ activeKey }) => {
  const activeFinger = getFinger(activeKey);

  const isActive = (key: string) => {
    const k = key.toLowerCase();
    const ak = activeKey.toLowerCase();
    if (k === ak) return true;
    if (SYMBOL_MAP[key] === activeKey) return true;
    if (activeKey === ' ' && key === 'Space') return true;
    return false;
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-between gap-2 overflow-hidden">
      {/* Keyboard Grid */}
      <div className="flex flex-col gap-1.5 p-4 bg-[#2c2e31]/80 rounded-2xl w-full border border-white/5 select-none transition-all duration-300">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5">
            {row.map((key, keyIndex) => {
              const isHighlighted = isActive(key);
              const finger = getFinger(key);
              const activeColorClass = ACTIVE_COLORS[finger];
              const fingerColorClass = FINGER_COLORS[finger];
              
              let widthClass = 'w-10';
              if (key === 'Backspace') widthClass = 'w-20';
              if (key === 'Tab') widthClass = 'w-14';
              if (key === 'Caps') widthClass = 'w-16';
              if (key === 'Enter') widthClass = 'w-20';
              if (key === 'Shift') widthClass = 'w-24';
              if (key === 'Space') widthClass = 'w-[320px]';

              return (
                <div
                  key={`${rowIndex}-${keyIndex}`}
                  className={`
                    ${widthClass} h-9 flex items-center justify-center rounded-lg text-[9px] font-bold transition-all duration-100 border
                    ${isHighlighted ? activeColorClass : fingerColorClass}
                  `}
                >
                  <span className="uppercase">{key === 'Space' ? '' : key}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Hands Visualization */}
      <HandSVG activeFinger={activeFinger} />
      
      {/* Dot-style Finger Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 w-full max-w-3xl shrink-0 pb-1">
        {LEGEND_DATA.map((item) => {
          const isTargetFinger = activeFinger === item.key;
          return (
            <div 
              key={item.key} 
              className={`flex items-center gap-2 px-3 py-1 rounded-xl transition-all duration-300 border ${
                isTargetFinger 
                  ? 'bg-white/10 border-white/10 scale-105' 
                  : 'bg-transparent border-transparent opacity-40'
              }`}
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: HEX_COLORS[item.key as keyof typeof HEX_COLORS] }}
              />
              <span className={`text-[8px] font-black tracking-widest ${isTargetFinger ? 'text-white' : 'text-[#646669]'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
