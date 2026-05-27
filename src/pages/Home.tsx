import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Stats } from "../components/Stats";
import { ProductCategories } from "../components/ProductCategories";
import { Services } from "../components/Services";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Contact } from "../components/Contact";
import { QuoteBuilder } from "../components/QuoteBuilder";
import { ChevronRight, ArrowRight, Layers, Sliders, CheckCircle } from 'lucide-react';

const roadmap = [
  { 
    step: '01', 
    title: 'Tech Pack & Sizing', 
    desc: 'Expert design translation, sizing blueprints, and digital pattern grading.', 
    detail: 'We convert sketches or reference garments into digital DXF patterns. Sizing curves are graded from XS to 5XL for boxy, oversized, or standard fits, producing structured specifications for cutting panels.',
    metric: 'Sizing Tolerances: ±0.5cm'
  },
  { 
    step: '02', 
    title: 'Fabric Sourcing & Dyeing', 
    desc: 'Cotton sourcing (240-500 GSM) and custom Pantone reactive dyeing.', 
    detail: 'Yarns are sourced from combed organic cotton. Fabrics undergo custom Pantone matching via reactive dye baths, followed by pre-shrunk, silicone softeners, and anti-pilling finishing treatments.',
    metric: 'Color Fastness: Grade 4+'
  },
  { 
    step: '03', 
    title: 'Precision Cut & Sew', 
    desc: 'Digital cutting tables and specialized multi-needle flatlock construction.', 
    detail: 'Raw fabric rolls are machine-cut for precision panel alignments. Garments are assembled using heavy-duty flatlock stitching (4-needle 6-thread) and double-stitched reinforcements on tension points.',
    metric: 'Stitches per Inch: 10-12 SPI'
  },
  { 
    step: '04', 
    title: 'Custom Embellishments', 
    desc: 'Advanced screen printing, wash processes, and precision embroidery.', 
    detail: 'Graphics are executed using standard plastisol, water-based inks, high-density puff, or foil. Embroidery is handled on multi-head rigs supporting 3D puff, flat satin, and chenille patch appliques.',
    metric: 'Resolution: 300+ DPI'
  },
  { 
    step: '05', 
    title: 'Dual Quality Audit', 
    desc: 'Two-stage manual inspection checking dimensions, seams, and wash cycles.', 
    detail: 'Every single garment is hand-measured against tech-pack tables. We verify seam tensile strength, perform batch-wash tests to verify shrinkage rates, and prune loose threads for a clean presentation.',
    metric: 'AQL Quality Level: 1.5'
  },
  { 
    step: '06', 
    title: 'Pack & Global Shipping', 
    desc: 'Hangtag stickering, bio-polybag wraps, and custom logistics.', 
    detail: 'Finished pieces are folded, barcode stickered, and packed into GOTS-certified biodegradable polybags. We prepare export invoices, certificates of origin, and coordinate air or ocean freight direct to warehouses.',
    metric: 'Global Transit: 5-8 Days (Air)'
  }
];

export function Home() {
  const [selectedRoadmap, setSelectedRoadmap] = useState(0);

  return (
    <>
      <Hero />
      <About />
      <Stats />
      <ProductCategories />
      <Services />

      {/* Interactive Manufacturing Roadmap Slider */}
      <section id="roadmap" className="py-24 px-4 relative overflow-hidden bg-slate-50/30 border-t border-black/5">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">Production Roadmap</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Explore our end-to-end B2B clothing manufacturing process step-by-step.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Step Selection Buttons */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              {roadmap.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRoadmap(index)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-4 ${
                    selectedRoadmap === index
                      ? 'bg-white border-purple-500/20 shadow-md ring-1 ring-purple-500/5'
                      : 'bg-transparent border-black/5 hover:border-black/10 hover:bg-black/5'
                  }`}
                >
                  <span className={`text-xl font-bold transition-colors ${
                    selectedRoadmap === index ? 'text-purple-600' : 'text-slate-400'
                  }`}>
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-semibold transition-colors ${
                      selectedRoadmap === index ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5 line-clamp-1">{item.desc}</p>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${
                    selectedRoadmap === index ? 'text-slate-900 translate-x-1' : 'text-slate-400'
                  }`} />
                </button>
              ))}
            </div>

            {/* Display Detailed Panel */}
            <div className="lg:col-span-7 flex">
              <div className="glass rounded-3xl p-8 md:p-10 border-white/60 w-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white/60 to-white/30 shadow-lg">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedRoadmap}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-6">
                        <span className="text-sm font-semibold tracking-wider text-purple-600 uppercase">
                          Phase {roadmap[selectedRoadmap].step}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-black/5 text-xs text-slate-700 border border-black/5 font-medium flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-600" />
                          {roadmap[selectedRoadmap].metric}
                        </span>
                      </div>

                      <h3 className="text-3xl font-bold text-slate-900 mb-4">
                        {roadmap[selectedRoadmap].title}
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed font-light">
                        {roadmap[selectedRoadmap].detail}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row gap-4 items-center justify-between mt-8">
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Layers className="h-4 w-4" /> B2B Standard</span>
                        <span className="flex items-center gap-1"><Sliders className="h-4 w-4" /> Customized Sizing</span>
                      </div>
                      <button
                        onClick={() => {
                          const element = document.getElementById('quote-builder');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-slate-900 hover:text-purple-600 transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        Configure Selections
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      <QuoteBuilder />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
