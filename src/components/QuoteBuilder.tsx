import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles, AlertCircle, ShoppingBag, Calendar, Clock, Printer, FileText, X, Scale } from 'lucide-react';
import { Button } from './ui/button';

const silhouettes = [
  { id: 'tee', name: 'Heavyweight Tee', baseMoq: 50, leadDays: 14, icon: '👕', desc: 'Boxy, drop-shoulder streetwear cut', basePrice: 12.50 },
  { id: 'hoodie', name: 'French Terry Hoodie', baseMoq: 50, leadDays: 20, icon: '🧥', desc: 'Oversized fit, double-lined hood, kangaroo pocket', basePrice: 24.50 },
  { id: 'sweatshirt', name: 'Crewneck Sweatshirt', baseMoq: 50, leadDays: 18, icon: '👚', desc: 'Heavyweight, ribbed collar and side panels', basePrice: 19.50 },
  { id: 'joggers', name: 'Cargo Joggers', baseMoq: 50, leadDays: 22, icon: '👖', desc: 'Multi-pocket streetwear details, customized hems', basePrice: 22.00 },
  { id: 'jacket', name: 'Utility Overshirt', baseMoq: 75, leadDays: 26, icon: '👔', desc: 'Button-up utility pockets, premium Twill build', basePrice: 28.00 }
];

const fabrics = [
  { id: 'cotton-240', name: 'Organic Cotton (240 GSM)', composition: '100% GOTS Cotton', tag: 'Streetwear', pricePerUnit: 0.00 },
  { id: 'terry-400', name: 'French Terry (400 GSM)', composition: '100% Combed Cotton', tag: 'Heavyweight', pricePerUnit: 2.50 },
  { id: 'fleece-450', name: 'Super Heavy Fleece (450 GSM)', composition: '80% Cotton / 20% Poly', tag: 'Ultra-Premium', pricePerUnit: 4.00 },
  { id: 'nylon-tech', name: 'Technical Ripstop Nylon', composition: '100% Recycled Nylon', tag: 'Techwear', pricePerUnit: 5.50 }
];

const techniques = [
  { id: 'screen', name: 'HD Plastisol Screen Print', complexity: 'Standard', addDays: 3, pricePerUnit: 1.50 },
  { id: 'puff', name: '3D Puff Ink Printing', complexity: 'Medium', addDays: 5, pricePerUnit: 2.20 },
  { id: 'embroidery-flat', name: 'Flat Satin Stitch Embroidery', complexity: 'Standard', addDays: 4, pricePerUnit: 2.00 },
  { id: 'embroidery-puff', name: '3D Chenille / Towel Patch', complexity: 'High', addDays: 7, pricePerUnit: 3.50 },
  { id: 'dye-acid', name: 'Vintage Acid / Mineral Wash', complexity: 'High', addDays: 6, pricePerUnit: 4.00 },
  { id: 'dye-enzyme', name: 'Enzyme Silicone Wash', complexity: 'Standard', addDays: 3, pricePerUnit: 1.80 }
];

export function QuoteBuilder() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedSilhouette, setSelectedSilhouette] = useState(silhouettes[0]);
  const [selectedFabric, setSelectedFabric] = useState(fabrics[0]);
  const [selectedTechniques, setSelectedTechniques] = useState<typeof techniques>([]);
  const [quantity, setQuantity] = useState(100);
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  const toggleTechnique = (tech: typeof techniques[0]) => {
    if (selectedTechniques.some(t => t.id === tech.id)) {
      setSelectedTechniques(selectedTechniques.filter(t => t.id !== tech.id));
    } else {
      setSelectedTechniques([...selectedTechniques, tech]);
    }
  };

  // Calculations
  const baseDays = selectedSilhouette.leadDays;
  const techDays = selectedTechniques.reduce((sum, t) => sum + t.addDays, 0);
  const qtyMultiplier = quantity > 1000 ? 1.5 : quantity > 500 ? 1.25 : 1.0;
  
  const estimatedSampleDays = 7 + Math.ceil(techDays * 0.5);
  const estimatedProductionDays = Math.ceil((baseDays + techDays) * qtyMultiplier);
  const isMoqMet = quantity >= selectedSilhouette.baseMoq;

  // Price calculations
  const rawUnitPrice = selectedSilhouette.basePrice + selectedFabric.pricePerUnit + selectedTechniques.reduce((sum, t) => sum + t.pricePerUnit, 0);
  let discountPercentage = 0;
  if (quantity >= 1000) discountPercentage = 30;
  else if (quantity >= 500) discountPercentage = 20;
  else if (quantity >= 300) discountPercentage = 15;
  else if (quantity >= 100) discountPercentage = 10;

  const finalUnitPrice = rawUnitPrice * (1 - discountPercentage / 100);
  const totalPrice = finalUnitPrice * quantity;

  // Next tier suggestion details
  let nextQty = 0;
  let nextDiscount = 0;
  if (quantity < 100) { nextQty = 100; nextDiscount = 10; }
  else if (quantity < 300) { nextQty = 300; nextDiscount = 15; }
  else if (quantity < 500) { nextQty = 500; nextDiscount = 20; }
  else if (quantity < 1000) { nextQty = 1000; nextDiscount = 30; }

  const handleApplyToQuote = () => {
    const summaryText = `Inquiry Details:
- Silhouette: ${selectedSilhouette.name}
- Fabric: ${selectedFabric.name} (${selectedFabric.composition})
- Customizations: ${selectedTechniques.length > 0 ? selectedTechniques.map(t => t.name).join(', ') : 'None'}
- Target Quantity: ${quantity} units
- Estimated Unit Price: $${finalUnitPrice.toFixed(2)}
- Estimated Total: $${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const event = new CustomEvent('duskyn-apply-quote', {
      detail: {
        subject: `Custom Production Inquiry: ${selectedSilhouette.name}`,
        message: `Hi Dusky Apparels team,\n\nI would like to request a quote for the following project configured on your site:\n\n${summaryText}\n\nPlease let me know the pricing and next steps for sample development.\n\nBest regards,`
      }
    });
    window.dispatchEvent(event);

    // Smooth scroll down to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper for rendering garment mockups based on selected configuration
  const renderGarmentPreview = (id: string, fabricId: string, techs: typeof techniques) => {
    let strokeColor = '#0f172a'; // slate-900
    let fillColor = 'rgba(241, 245, 249, 0.6)'; // light slate
    let textureGrid = false;
    
    if (fabricId === 'terry-400') {
      fillColor = 'rgba(226, 232, 240, 0.7)';
    } else if (fabricId === 'fleece-450') {
      fillColor = 'rgba(203, 213, 225, 0.8)';
    } else if (fabricId === 'nylon-tech') {
      fillColor = 'rgba(186, 230, 253, 0.45)'; // technical light blue
      textureGrid = true;
    }

    const hasPrint = techs.some(t => t.id.includes('screen') || t.id.includes('puff'));
    const hasEmbroidery = techs.some(t => t.id.includes('embroidery'));
    const hasWash = techs.some(t => t.id.includes('dye'));

    return (
      <div className="w-full h-full flex items-center justify-center relative select-none">
        {/* Grid lines overlay for technical blueprint look */}
        {textureGrid && (
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }} />
        )}

        {id === 'tee' && (
          <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-sm" fill="none" stroke={strokeColor} strokeWidth="1.8">
            <path d="M30,22 L40,20 Q50,22 60,20 L70,22 L82,36 L73,40 L68,32 L68,82 L32,82 L32,32 L27,40 L18,36 Z" fill={fillColor} strokeLinejoin="round" />
            <path d="M40,20 Q50,25 60,20" strokeWidth="1.2" />
            {hasPrint && <path d="M41,40 L59,40 L59,52 L41,52 Z" fill="rgba(124, 58, 237, 0.1)" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="0.8" strokeDasharray="2 1.5" />}
            {hasPrint && <text x="50" y="47" fontSize="4" fontWeight="bold" fill="#6d28d9" textAnchor="middle" letterSpacing="0.4">DUSKYN</text>}
            {hasEmbroidery && <circle cx="37" cy="32" r="2.5" fill="rgba(236, 72, 153, 0.1)" stroke="#db2777" strokeWidth="0.8" />}
            {hasEmbroidery && <text x="37" y="33" fontSize="3" fontWeight="bold" fill="#db2777" textAnchor="middle">★</text>}
          </svg>
        )}
        {id === 'hoodie' && (
          <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-sm" fill="none" stroke={strokeColor} strokeWidth="1.8">
            <path d="M30,28 L35,26 Q50,29 65,26 L70,28 L82,45 L74,48 L68,38 L68,84 L32,84 L32,38 L26,48 L18,45 Z" fill={fillColor} strokeLinejoin="round" />
            <path d="M35,26 C30,12 50,5 50,5 C50,5 70,12 65,26" strokeLinejoin="round" />
            <path d="M38,64 L62,64 L59,84 L41,84 Z" strokeLinejoin="round" />
            <path d="M47,26 L47,38" strokeWidth="1" />
            <path d="M53,26 L53,40" strokeWidth="1" />
            {hasPrint && <path d="M40,43 L60,43 L60,54 L40,54 Z" fill="rgba(124, 58, 237, 0.1)" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="0.8" strokeDasharray="2 1.5" />}
            {hasPrint && <text x="50" y="49" fontSize="4" fontWeight="bold" fill="#6d28d9" textAnchor="middle" letterSpacing="0.4">DUSKYN</text>}
            {hasEmbroidery && <circle cx="37" cy="35" r="2" fill="rgba(236, 72, 153, 0.1)" stroke="#db2777" strokeWidth="0.8" />}
          </svg>
        )}
        {id === 'sweatshirt' && (
          <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-sm" fill="none" stroke={strokeColor} strokeWidth="1.8">
            <path d="M30,22 L38,20 Q50,22 62,20 L70,22 L82,42 L74,45 L68,32 L68,82 L32,82 L32,32 L26,45 L18,42 Z" fill={fillColor} strokeLinejoin="round" />
            <ellipse cx="50" cy="21" rx="12" ry="3" />
            <path d="M32,79 L68,79" />
            {hasPrint && <path d="M40,38 L60,38 L60,50 L40,50 Z" fill="rgba(124, 58, 237, 0.1)" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="0.8" strokeDasharray="2 1.5" />}
            {hasPrint && <text x="50" y="45" fontSize="4" fontWeight="bold" fill="#6d28d9" textAnchor="middle" letterSpacing="0.4">DUSKYN</text>}
            {hasEmbroidery && <circle cx="37" cy="30" r="2.5" fill="rgba(236, 72, 153, 0.1)" stroke="#db2777" strokeWidth="0.8" />}
            {hasEmbroidery && <text x="37" y="31" fontSize="3" fill="#db2777" textAnchor="middle">★</text>}
          </svg>
        )}
        {id === 'joggers' && (
          <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-sm" fill="none" stroke={strokeColor} strokeWidth="1.8">
            <path d="M35,15 L65,15 L67,23 L62,85 L54,85 L50,50 L46,50 L38,85 L30,85 L33,23 Z" fill={fillColor} strokeLinejoin="round" />
            <path d="M35,20 L65,20" />
            <path d="M63,40 L65,40 L64,52 L62,52 Z" />
            <path d="M37,40 L35,40 L36,52 L38,52 Z" />
            <path d="M50,17 L50,24" strokeWidth="1" />
            {hasEmbroidery && <circle cx="39" cy="27" r="2" fill="rgba(236, 72, 153, 0.1)" stroke="#db2777" strokeWidth="0.8" />}
          </svg>
        )}
        {id === 'jacket' && (
          <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-sm" fill="none" stroke={strokeColor} strokeWidth="1.8">
            <path d="M30,22 L40,20 L50,23 L60,20 L70,22 L81,38 L73,41 L68,32 L68,82 L32,82 L32,32 L27,41 L19,38 Z" fill={fillColor} strokeLinejoin="round" />
            <path d="M30,22 L42,32 L50,23 L58,32 L70,22" />
            <path d="M50,23 L50,82" />
            <circle cx="50" cy="35" r="1.2" fill="currentColor" />
            <circle cx="50" cy="48" r="1.2" fill="currentColor" />
            <circle cx="50" cy="61" r="1.2" fill="currentColor" />
            <path d="M35,35 L45,35 L45,45 L35,45 Z" />
            <path d="M55,35 L65,35 L65,45 L55,45 Z" />
            {hasPrint && <text x="50" y="70" fontSize="4" fontWeight="bold" fill="#6d28d9" textAnchor="middle" letterSpacing="0.4">DUSKYN</text>}
            {hasEmbroidery && <circle cx="60" cy="40" r="2" fill="rgba(236, 72, 153, 0.1)" stroke="#db2777" strokeWidth="0.8" />}
          </svg>
        )}

        {hasWash && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[8px] text-purple-700 font-semibold uppercase animate-pulse">
            Vintage Dyed
          </span>
        )}
      </div>
    );
  };

  return (
    <section id="quote-builder" className="py-24 px-4 relative overflow-hidden bg-slate-50/50 border-t border-black/5">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-300/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-300/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 border border-purple-500/15 shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-purple-700 uppercase">REAL-TIME SPEC BUILDER</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight"
          >
            Apparel Configurator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            Select your silhouette, pick custom fabrics, choose print methods, and calculate production lead times in real-time.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Wizard Steps */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8 relative border-white/60 shadow-lg">
              
              {/* Step Navigation Bar */}
              <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-6">
                {[
                  { step: 1, name: 'Silhouette' },
                  { step: 2, name: 'Fabric' },
                  { step: 3, name: 'Technique' },
                  { step: 4, name: 'Volume' }
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className="flex flex-col items-center gap-2 group focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      activeStep === s.step
                        ? 'bg-slate-950 text-white shadow-md'
                        : activeStep > s.step
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-black/5 text-slate-400 border border-black/5 hover:border-black/10 hover:bg-black/10'
                    }`}>
                      {activeStep > s.step ? <Check className="h-4 w-4" /> : s.step}
                    </div>
                    <span className={`text-xs font-medium transition-colors hidden sm:block ${
                      activeStep === s.step ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      {s.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Wizard Content */}
              <div className="min-h-[320px]">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Silhouette */}
                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-slate-900">Select a Streetwear Silhouette</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {silhouettes.map((sil) => (
                          <div
                            key={sil.id}
                            onClick={() => setSelectedSilhouette(sil)}
                            className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                              selectedSilhouette.id === sil.id
                                ? 'bg-white border-purple-500/30 shadow-md ring-1 ring-purple-500/10'
                                : 'bg-white/40 border-black/5 hover:border-black/10 hover:bg-white/60 shadow-sm'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-3xl">{sil.icon}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                selectedSilhouette.id === sil.id ? 'border-purple-600 bg-purple-600' : 'border-black/20'
                              }`}>
                                {selectedSilhouette.id === sil.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            <h4 className="text-lg font-semibold text-slate-900">{sil.name}</h4>
                            <p className="text-xs text-slate-500 mt-1 font-light">{sil.desc}</p>
                            <div className="flex justify-between items-center mt-3">
                              <div className="text-xs text-purple-600 font-medium">MOQ: {sil.baseMoq} pcs</div>
                              <div className="text-xs text-slate-400 font-light">From ${sil.basePrice.toFixed(2)}/pc</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Fabric */}
                  {activeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-slate-900">Select Fabric & Knit</h3>
                      <div className="grid gap-4">
                        {fabrics.map((fab) => (
                          <div
                            key={fab.id}
                            onClick={() => setSelectedFabric(fab)}
                            className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 flex justify-between items-center ${
                              selectedFabric.id === fab.id
                                ? 'bg-white border-purple-500/30 shadow-md ring-1 ring-purple-500/10'
                                : 'bg-white/40 border-black/5 hover:border-black/10 hover:bg-white/60 shadow-sm'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-lg font-semibold text-slate-900">{fab.name}</h4>
                                <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-100 text-[10px] text-purple-700 font-medium">
                                  {fab.tag}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 font-light">{fab.composition}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-slate-400">
                                {fab.pricePerUnit > 0 ? `+$${fab.pricePerUnit.toFixed(2)}/pc` : 'Included'}
                              </span>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                selectedFabric.id === fab.id ? 'border-purple-600 bg-purple-600' : 'border-black/20'
                              }`}>
                                {selectedFabric.id === fab.id && <Check className="h-3 w-3 text-white" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Techniques */}
                  {activeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-slate-900">Choose Print & Wash Techniques (Multiple)</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {techniques.map((tech) => {
                          const isSelected = selectedTechniques.some(t => t.id === tech.id);
                          return (
                            <div
                              key={tech.id}
                              onClick={() => toggleTechnique(tech)}
                              className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-white border-purple-500/30 shadow-md ring-1 ring-purple-500/10'
                                  : 'bg-white/40 border-black/5 hover:border-black/10 hover:bg-white/60 shadow-sm'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-slate-900">{tech.name}</h4>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                  isSelected ? 'border-purple-600 bg-purple-600' : 'border-black/20'
                                }`}>
                                  {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <div className="text-xs text-slate-500 font-light">
                                  Complexity: <span className="font-medium text-slate-700">{tech.complexity}</span>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-purple-600 font-medium">+{tech.addDays} Days</div>
                                  <div className="text-[10px] text-slate-400">+$${tech.pricePerUnit.toFixed(2)}/pc</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Quantity & Volume */}
                  {activeStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-slate-900">Select Production Volume</h3>
                      <div className="space-y-8 py-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Order Quantity</span>
                          <span className="text-3xl font-bold text-slate-900 tracking-tight">{quantity} units</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="2500"
                          step="10"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value))}
                          className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>30 units</span>
                          <span>500 units</span>
                          <span>1000 units</span>
                          <span>2500+ units</span>
                        </div>

                        {/* Cost Estimator Feedback */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                          <div className="p-4 bg-slate-50 border border-black/5 rounded-2xl text-center">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Raw Unit Cost</span>
                            <span className="text-lg font-bold text-slate-700 line-through">${rawUnitPrice.toFixed(2)}</span>
                          </div>
                          <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl text-center">
                            <span className="text-[10px] text-purple-600 uppercase tracking-wider block mb-1">Volume Pricing</span>
                            <span className="text-lg font-bold text-purple-700">${finalUnitPrice.toFixed(2)}</span>
                            {discountPercentage > 0 && (
                              <span className="text-[9px] text-purple-500 block font-semibold">({discountPercentage}% Off)</span>
                            )}
                          </div>
                        </div>

                        {nextQty > 0 ? (
                          <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 flex items-center gap-3 text-purple-800 text-xs font-medium">
                            <Sparkles className="h-4 w-4 text-purple-500 animate-pulse flex-shrink-0" />
                            <div>
                              Add <span className="font-extrabold">{nextQty - quantity}</span> more units to unlock the <span className="font-extrabold">{nextDiscount}%</span> discount tier!
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex items-center gap-3 text-green-800 text-xs font-medium">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <div>
                              Maximum bulk discount tier unlocked! (<span className="font-extrabold">30% Off</span>)
                            </div>
                          </div>
                        )}

                        {!isMoqMet && (
                          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3 text-amber-800 text-sm">
                            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
                            <div>
                              <span className="font-semibold">Under Minimum Order Qty (MOQ):</span> Selected silhouette requires a minimum of {selectedSilhouette.baseMoq} units for bulk pricing.
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center mt-8 border-t border-black/5 pt-6">
                <Button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(activeStep - 1)}
                  variant="outline"
                  className="rounded-full border-black/10 hover:bg-black/5 text-slate-800"
                >
                  Previous
                </Button>
                {activeStep < 4 ? (
                  <Button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="bg-slate-950 text-white hover:bg-slate-800 rounded-full font-medium shadow-md"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowSpecSheet(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium shadow-md"
                  >
                    Generate Estimate
                  </Button>
                )}
              </div>

            </div>
          </div>

          {/* Right: Sticky Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="glass rounded-3xl p-6 border-white/60 shadow-lg relative overflow-hidden bg-gradient-to-b from-white/60 to-white/30">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
                Live Estimate
              </h3>

              {/* Garment Blueprint Preview Window */}
              <div className="mb-6 rounded-2xl border border-black/5 bg-black/[0.02] p-4 flex flex-col items-center justify-center relative overflow-hidden h-40 group shadow-inner">
                {renderGarmentPreview(selectedSilhouette.id, selectedFabric.id, selectedTechniques)}
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/5 border border-black/5 text-[8px] text-slate-400 font-mono">
                  CAD_2D
                </span>
              </div>

              {/* Selections List */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-start border-b border-black/5 pb-2.5">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Silhouette</span>
                    <p className="text-sm font-semibold text-slate-900">{selectedSilhouette.name}</p>
                  </div>
                  <span className="text-xl">{selectedSilhouette.icon}</span>
                </div>

                <div className="flex justify-between items-start border-b border-black/5 pb-2.5">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Fabric & Blend</span>
                    <p className="text-sm font-semibold text-slate-900">{selectedFabric.name}</p>
                    <p className="text-[9px] text-slate-500 font-light mt-0.5">{selectedFabric.composition}</p>
                  </div>
                </div>

                <div className="flex justify-between items-start border-b border-black/5 pb-2.5">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Embellishments ({selectedTechniques.length})</span>
                    <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">
                      {selectedTechniques.length > 0
                        ? selectedTechniques.map(t => t.name).join(', ')
                        : 'None Selected'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-start pb-1">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Target Qty</span>
                    <p className="text-sm font-semibold text-slate-900">{quantity} units</p>
                  </div>
                </div>
              </div>

              {/* Estimate Details */}
              <div className="space-y-3 bg-black/[0.02] rounded-2xl p-4 border border-black/5 mb-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>Sample Delivery</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{estimatedSampleDays} - {estimatedSampleDays + 3} Days</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>Bulk Production</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{estimatedProductionDays} - {estimatedProductionDays + 5} Days</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-black/5">
                  <div className="text-xs text-slate-500">Unit Price</div>
                  <span className="text-sm font-bold text-slate-900">${finalUnitPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-slate-500">Total Price</div>
                  <span className="text-sm font-extrabold text-purple-600">
                    ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleApplyToQuote}
                  className="w-full h-12 bg-slate-950 text-white hover:bg-slate-800 transition-all font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  Send Request to Forms
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => setShowSpecSheet(true)}
                  variant="outline"
                  className="w-full h-10 border-black/10 hover:bg-black/5 text-slate-800 transition-all font-semibold rounded-2xl flex items-center justify-center gap-2 text-xs"
                >
                  <FileText className="h-4 w-4 text-slate-500" />
                  View Tech Spec Sheet
                </Button>
              </div>

              <p className="text-[10px] text-center text-slate-400 mt-4 font-light">
                *Times calculated reflect B2B factory throughput slots and custom fabric alignments.
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Tech Spec Sheet Modal */}
      <AnimatePresence>
        {showSpecSheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border border-black/10 shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-8 py-5 border-b border-black/5 bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-slate-900">Technical Specification Sheet</h3>
                </div>
                <button
                  onClick={() => setShowSpecSheet(false)}
                  className="p-2 hover:bg-black/5 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sheet Body (scrollable) */}
              <div className="p-8 overflow-y-auto space-y-8 flex-1">
                {/* Garment Details & Blueprint */}
                <div className="grid md:grid-cols-2 gap-8 items-center border-b border-black/5 pb-8">
                  <div className="rounded-2xl border border-dashed border-purple-500/25 bg-purple-50/20 p-6 flex items-center justify-center h-48">
                    {renderGarmentPreview(selectedSilhouette.id, selectedFabric.id, selectedTechniques)}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-purple-600 font-semibold uppercase tracking-wider">Product Spec</span>
                      <h4 className="text-2xl font-extrabold text-slate-950 mt-1">{selectedSilhouette.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">{selectedSilhouette.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                      <div>
                        <span className="text-slate-400">Fabric Base</span>
                        <p className="font-semibold text-slate-800 mt-0.5">{selectedFabric.name}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Composition</span>
                        <p className="font-semibold text-slate-800 mt-0.5">{selectedFabric.composition}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Graded Dimensions Table */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-purple-600" /> Graded Dimensions (Chest width x Body length)
                  </h4>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
                      let dimensions = "54cm x 70cm";
                      if (sz === 'S') dimensions = "52cm x 68cm";
                      if (sz === 'L') dimensions = "57cm x 72cm";
                      if (sz === 'XL') dimensions = "60cm x 74cm";
                      if (sz === 'XXL') dimensions = "63cm x 76cm";
                      if (selectedSilhouette.id === 'joggers') {
                        dimensions = "Waist: 30\" - 38\"";
                      }
                      return (
                        <div key={sz} className="p-3 bg-slate-50 border border-black/5 rounded-xl">
                          <div className="font-bold text-slate-900">{sz}</div>
                          <div className="text-[10px] text-slate-500 mt-1">{dimensions}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Techniques & Timelines */}
                <div className="grid md:grid-cols-2 gap-6 border-b border-black/5 pb-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Selected Techniques</h4>
                    {selectedTechniques.length > 0 ? (
                      <ul className="space-y-2 text-xs">
                        {selectedTechniques.map((tech) => (
                          <li key={tech.id} className="flex justify-between items-center p-2.5 bg-slate-50 border border-black/5 rounded-xl">
                            <span className="font-semibold text-slate-800">{tech.name}</span>
                            <span className="text-purple-600 font-medium">+{tech.addDays} Days</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No custom embellishments configured.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Timelines & Turnaround</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between p-2.5 bg-slate-50 border border-black/5 rounded-xl">
                        <span className="text-slate-500">Sample Development</span>
                        <span className="font-bold text-slate-900">{estimatedSampleDays} - {estimatedSampleDays + 3} Days</span>
                      </div>
                      <div className="flex justify-between p-2.5 bg-slate-50 border border-black/5 rounded-xl">
                        <span className="text-slate-500">Bulk Production</span>
                        <span className="font-bold text-slate-900">{estimatedProductionDays} - {estimatedProductionDays + 5} Days</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <span className="text-xs text-purple-700 font-medium">Quote Configuration ({quantity} units)</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold text-slate-950">${finalUnitPrice.toFixed(2)}</span>
                      <span className="text-xs text-slate-400">per unit</span>
                    </div>
                    {discountPercentage > 0 && (
                      <p className="text-xs text-purple-600 font-semibold mt-1">Includes {discountPercentage}% volume discount</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Estimated Total Order Value</span>
                    <p className="text-2xl font-black text-purple-700 mt-1">
                      ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Controls */}
              <div className="px-8 py-5 border-t border-black/5 bg-slate-50 flex justify-between gap-4">
                <Button
                  onClick={() => {
                    setShowSpecSheet(false);
                    handleApplyToQuote();
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm flex-1"
                >
                  Apply to Inquiry Forms
                </Button>
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="border-slate-900/10 hover:bg-slate-900/5 text-slate-800 rounded-xl font-semibold text-sm flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" /> Print / Save PDF
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
