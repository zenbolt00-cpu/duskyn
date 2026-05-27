import { cn } from './utils';

interface LogoProps {
  className?: string;
  glow?: boolean;
}

export function Logo({ className, glow = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transition-all duration-500",
          glow && "drop-shadow-[0_2px_4px_rgba(124,58,237,0.15)] hover:drop-shadow-[0_4px_8px_rgba(124,58,237,0.3)]"
        )}
      >
        {/* Needle */}
        <path
          d="M50 8 L52.5 35 L51 82 C51 83 49 83 49 82 L47.5 35 L50 8 Z"
          fill="url(#needleGrad)"
        />
        {/* Needle Eye */}
        <ellipse cx="50" cy="22" rx="1.2" ry="7" fill="#000000" />
        
        {/* Thread 1 weaving through */}
        <path
          d="M15 50 Q 32.5 78, 50 22 T 85 50"
          stroke="url(#threadGrad1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Thread 2 counter-weaving (dashed) */}
        <path
          d="M15 50 Q 32.5 22, 50 22 T 85 50"
          stroke="url(#threadGrad2)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 2"
          fill="none"
          opacity="0.75"
        />

        {/* Gradients definitions */}
        <defs>
          <linearGradient id="needleGrad" x1="50" y1="8" x2="50" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#475569" />
            <stop offset="0.5" stopColor="#94A3B8" />
            <stop offset="1" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="threadGrad1" x1="15" y1="50" x2="85" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" /> {/* Indigo */}
            <stop offset="0.5" stopColor="#a855f7" /> {/* Purple */}
            <stop offset="1" stopColor="#3b82f6" /> {/* Blue */}
          </linearGradient>
          <linearGradient id="threadGrad2" x1="15" y1="50" x2="85" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="0.5" stopColor="#64748B" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-bold tracking-widest text-slate-900 font-sans">
        DUSKYN
      </span>
    </div>
  );
}
