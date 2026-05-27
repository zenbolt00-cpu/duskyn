import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './ui/Logo';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
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

  return (
    <footer className="glass border-t border-white/60 bg-white/45 backdrop-blur-xl mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="cursor-pointer mb-6" onClick={() => handleNavClick('/')}>
              <Logo />
            </div>
            <p className="text-slate-500 max-w-sm font-light leading-relaxed">
              Premium streetwear manufacturing partnering with ambitious brands worldwide.
              Quality, precision, and reliability in every stitch.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 flex flex-col items-start">
              {[
                { label: 'About', path: '/#about' },
                { label: 'Fabrics', path: '/fabrics' },
                { label: 'Manufacturing', path: '/manufacturing' },
                { label: 'Embroidery', path: '/services/embroidery' },
                { label: 'Designing', path: '/services/designing' },
                { label: 'Contact', path: '/#contact' }
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className="text-slate-500 hover:text-slate-900 transition-colors text-left font-light"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Connect</h4>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-black/5 transition-all border-white/60 shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-black/5 mt-16 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DUSKYN Manufacturing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
