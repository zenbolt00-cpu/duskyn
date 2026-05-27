import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ShieldCheck, Ruler, Clock, Settings, Sparkles } from 'lucide-react';

const processesList = [
  {
    title: "Screen Printing Lab",
    category: "branding",
    description: "High-definition print setups utilizing plastisol, water-based, and discharge ink systems for oversized placements.",
    imageUrl: "/assets/screen-printing.png",
    specs: [
      { name: "Max Print Dimension", value: "45cm x 55cm (Oversized Backs)" },
      { name: "Pantone Precision", value: "PMS Solid Coated Match (99% accuracy)" },
      { name: "Minimum Line Weight", value: "0.5pt vector weight" },
      { name: "Specialized Inks", value: "High-Density Puff, Reflective, Metallic Foil, Glow" }
    ],
    sampleTime: "3-5 Days"
  },
  {
    title: "Precision Embroidery",
    category: "branding",
    description: "Multi-head computerized stitching, direct embroidery, and custom chenille or towel patch applique setups.",
    imageUrl: "/assets/embroidery.png",
    specs: [
      { name: "Thread Standard", value: "Madiera Rayon & Premium Polyester" },
      { name: "Max Stitch Area", value: "30cm x 30cm Direct Area" },
      { name: "Stitch Limit", value: "Up to 50,000 stitches per design placement" },
      { name: "Specialized Stitches", value: "3D Puff padding, Towel loops, Flat Satin, Chain" }
    ],
    sampleTime: "4-6 Days"
  },
  {
    title: "Garment Washes & Dyeing",
    category: "washing",
    description: "Vintage reactive dyeing, pigment spraying, mineral wash runs, and silicone softening treatments.",
    imageUrl: "/assets/fabrics-hero.png",
    specs: [
      { name: "Wash Formulations", value: "Acid Wash, Stone Wash, Enzyme Wash, Sun-Fade" },
      { name: "Dyeing Methods", value: "Reactive Dye, Pigment Dye, Sulfur Dye, Tie-Dye" },
      { name: "Shrinkage Control", value: "High-heat tumbler pre-shrinking cycles" },
      { name: "Chemical Auditing", value: "Zero harmful azo colorants (OEKO-TEX standard)" }
    ],
    sampleTime: "5-7 Days"
  },
  {
    title: "Pattern Making & Grading",
    category: "patterns",
    description: "Expert digital grading systems ensuring structured fits (oversized, boxy, utility) from XS to 5XL.",
    imageUrl: "/assets/pattern-making.png",
    specs: [
      { name: "CAD Systems", value: "Gerber Accumark & Optitex vector drafting" },
      { name: "Output Format", value: "DXF (AAMA/ASTM), PDF patterns, PLT marker sheets" },
      { name: "Fitting Prototyping", value: "3D CLO digital simulation & sewn muslin mockups" },
      { name: "Size Curve Scaling", value: "Symmetric grading curves for chest and sleeve lengths" }
    ],
    sampleTime: "2-4 Days"
  },
  {
    title: "Bespoke Cut & Sew",
    category: "washing",
    description: "Garment assembly from single knit panels to fully lined and paneled outerwear utility jackets.",
    imageUrl: "/assets/hero-main.png",
    specs: [
      { name: "Machinery Fleet", value: "Juki flatlock, overlock, and coverstitch machines" },
      { name: "Stitch Densities", value: "10-12 Stitches Per Inch (SPI)" },
      { name: "Re-enforcements", value: "Bar-tack joints on pockets, double-lined collars" },
      { name: "Flat Seam Finish", value: "Completely smooth friction-free inner seams" }
    ],
    sampleTime: "6-8 Days"
  },
  {
    title: "Retail Finishing",
    category: "patterns",
    description: "Custom woven labels, stickering, polybag wrapping, and final export carton packing.",
    imageUrl: "/assets/designing.png",
    specs: [
      { name: "Labeling Options", value: "Damask cotton neck tags, screen prints, tears" },
      { name: "Packaging Specs", value: "GOTS-certified biodegradable zip polybags" },
      { name: "Barcode Labeling", value: "GS1 UPC/EAN sticker placements" },
      { name: "Quality Check", value: "100% manual needle detection and visual checking" }
    ],
    sampleTime: "2-3 Days"
  }
];

export function Manufacturing() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProcesses = useMemo(() => {
    return activeCategory === 'all'
      ? processesList
      : processesList.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-slate-50/50 relative">
      {/* Ambient Backlights */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-10 w-[600px] h-[600px] bg-blue-300/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Manufacturing Tech Specs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Detailed specifications and parameters covering our print resolutions, sewing densities, wash standards, and digital grading.
          </motion.p>
        </div>

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          {[
            { id: 'all', name: 'All Processes' },
            { id: 'branding', name: 'Printing & Embroidery' },
            { id: 'washing', name: 'Dyeing & Sewing' },
            { id: 'patterns', name: 'Patterns & Finishing' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                  : 'bg-white/45 border-black/5 text-slate-500 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Process Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredProcesses.map((process) => (
              <motion.div
                layout
                key={process.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass overflow-hidden border border-white/60 group rounded-3xl h-full flex flex-col justify-between shadow-lg hover:bg-white/50 transition-colors duration-300">
                  <div>
                    {/* Image Header */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={process.imageUrl}
                        alt={`Duskyn clothing production process - ${process.title.toLowerCase()}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 moody-image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                    </div>

                    <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                          {process.title}
                        </h3>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-50 border border-purple-100 text-xs text-purple-700 font-medium">
                          <Clock className="h-3.5 w-3.5 text-purple-600" />
                          {process.sampleTime} Sample
                        </span>
                      </div>

                      <p className="text-slate-500 text-sm leading-relaxed font-light mb-6">
                        {process.description}
                      </p>

                      {/* Technical Specs List */}
                      <div className="space-y-3.5 border-t border-black/5 pt-6">
                        {process.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-start gap-4 text-xs">
                            <span className="text-slate-400 font-light flex items-center gap-1.5">
                              <Settings className="h-3.5 w-3.5 text-purple-600" />
                              {spec.name}
                            </span>
                            <span className="text-slate-700 text-right font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  {/* Trust indicator footer */}
                  <div className="p-8 pt-0 border-t border-black/5 mt-4 bg-black/[0.01] flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-purple-600" /> Certified B2B Spec
                    </span>
                    <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold flex items-center gap-1">
                      <Ruler className="h-3.5 w-3.5 text-purple-600" /> Retail Grade Checked
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
