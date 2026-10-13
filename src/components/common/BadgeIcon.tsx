import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface BadgeIconProps {
  level?: 'rakshak' | 'master' | 'sentinel';
  className?: string;
  size?: number;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ level = 'rakshak', className = '', size = 48 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl border border-[rgba(201,169,110,0.4)] bg-gradient-to-b from-[#131B2E] to-[#070B14] p-3 text-[#C9A96E] shadow-[0_0_24px_rgba(201,169,110,0.18)] ${className}`}
      style={{ width: size + 24, height: size + 24 }}
      role="img"
      aria-label={`CyberRakshak ${level} verification badge`}
    >
      <div className="absolute inset-0 rounded-2xl border border-[rgba(201,169,110,0.2)] animate-pulse opacity-40 pointer-events-none" />
      <ShieldCheck style={{ width: size, height: size }} className="text-[#C9A96E]" />
      <Award className="absolute -bottom-1 -right-1 w-5 h-5 text-[#E4D1A8] drop-shadow" />
    </div>
  );
};
