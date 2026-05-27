import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Fabrics } from './pages/Fabrics';
import { Manufacturing } from './pages/Manufacturing';

// ScrollToTop component to reset scroll on route change
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { ThreadCursor } from './components/effects/ThreadCursor';
import { Designing } from './pages/services/Designing';
import { Embroidery } from './pages/services/Embroidery';
import { ScreenPrinting } from './pages/services/ScreenPrinting';
import { Toaster } from './components/ui/sonner';

// ... (imports)

// ... (ScrollToTop)

export default function App() {
  return (
    <Router>
      <ThreadCursor />
      <ScrollToTop />
      <Toaster position="top-center" theme="dark" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fabrics" element={<Fabrics />} />
          <Route path="/manufacturing" element={<Manufacturing />} />

          {/* Service Routes */}
          <Route path="/services/embroidery" element={<Embroidery />} />
          <Route path="/services/screen-printing" element={<ScreenPrinting />} />
          <Route path="/services/designing" element={<Designing />} />
        </Route>
      </Routes>
    </Router>
  );
}