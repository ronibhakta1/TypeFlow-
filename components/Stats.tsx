
import React from 'react';
import { TypingStats } from '../types';

interface StatsProps {
  stats: TypingStats;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="flex gap-16 justify-center items-end h-24 mb-12 animate-in fade-in duration-500">
      <StatItem label="wpm" value={Math.round(stats.wpm)} />
      <StatItem label="accuracy" value={`${Math.round(stats.accuracy)}%`} />
      <StatItem label="raw" value={Math.round(stats.rawWpm)} />
      <StatItem label="time" value={`${Math.round(stats.timeElapsed)}s`} />
    </div>
  );
};

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-[#646669] text-xl font-bold lowercase leading-none mb-1">{label}</span>
    <span className="text-[#e2b714] text-5xl font-black leading-none">{value}</span>
  </div>
);

export default Stats;
