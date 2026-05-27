import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './ui/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './ui/Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith('/#')) {
      // If we are already on home, scroll to section
      if (location.pathname === '/') {
        const element = document.querySelector(path.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(path.substring(1));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      navigate(path);
    }
  };

  const scrollToQuote = () => {
    handleNavClick('/#quote-builder');
  };

  const navItems = [
    { label: 'Fabrics', path: '/fabrics' },
    { label: 'Manufacturing', path: '/manufacturing' },
    { label: 'Embroidery', path: '/services/embroidery' },
    { label: 'Printing', path: '/services/screen-printing' },
    { label: 'Designing', path: '/services/designing' },
    { label: 'About', path: '/#about' }
  ];

  return (
    <header
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className={cn(
        "max-w-6xl mx-auto rounded-2xl border transition-all duration-300",
        scrolled
          ? "bg-white/45 backdrop-blur-xl border-black/5 shadow-md"
          : "bg-transparent border-transparent"
      )}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className="text-sm font-medium text-slate-600 hover:text-black transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={scrollToQuote}
              className="bg-slate-950 text-white hover:bg-slate-800 transition-colors rounded-full px-6 font-semibold shadow-sm"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-black/5 rounded-2xl p-4 lg:hidden overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className="py-3 px-4 text-left text-slate-700 hover:text-black hover:bg-black/5 rounded-xl transition-all font-medium"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 px-4 pb-2">
                <Button
                  onClick={scrollToQuote}
                  className="w-full bg-slate-950 text-white hover:bg-slate-800 rounded-xl font-semibold"
                >
                  Get Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
