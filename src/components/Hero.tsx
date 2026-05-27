import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/assets/hero-main.png"
          alt="Duskyn high-end premium clothing manufacturer, streetwear factory, and B2B apparel production center"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/45 to-white/10" />
        <div className="absolute inset-0 bg-white/15 backdrop-blur-[0.5px]" />

        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-slate-900 mb-6"
        >
          DUSKYN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          Your creative production partner. From concept to global dispatch,
          we craft premium menswear for ambitious brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={() => scrollToSection('contact')}
            size="lg"
            className="h-14 px-8 text-lg rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-all font-medium"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={() => navigate('/manufacturing')}
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg rounded-full border-slate-900/20 text-slate-900 hover:bg-slate-900/5 hover:border-slate-900/40 transition-all backdrop-blur-md"
          >
            View Our Work
          </Button>
        </motion.div>

        {/* Stats Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl"
        >
          {[
            { label: 'Production Capacity', value: '50K+' },
            { label: 'Global Clients', value: '100+' },
            { label: 'Years Experience', value: '12+' },
            { label: 'Quality Check', value: '100%' },
          ].map((stat, index) => (
            <div key={index} className="glass p-6 rounded-2xl text-center hover:bg-white/60 transition-colors">
              <div className="text-3xl font-bold text-slate-950 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 font-light">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
