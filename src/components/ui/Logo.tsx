import { cn } from './utils';

interface LogoProps {
  className?: string;
  glow?: boolean;
}

export function Logo({ className, glow = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <img
        src="/assets/logo.svg"
        alt="Duskyn Logo"
        className={cn(
          "w-8 h-8 md:w-9 md:h-9 object-contain transition-all duration-500",
          glow && "drop-shadow-[0_2px_4px_rgba(124,58,237,0.15)] hover:drop-shadow-[0_4px_8px_rgba(124,58,237,0.3)]"
        )}
      />
      <span className="text-xl font-bold tracking-widest text-slate-900 font-sans">
        DUSKYN
      </span>
    </div>
  );
}

