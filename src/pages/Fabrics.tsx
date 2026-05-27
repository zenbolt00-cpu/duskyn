import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Search, Filter, Layers, Shield, Droplet, Star } from 'lucide-react';

const fabricsList = [
  {
    title: "Ultra Heavyweight Fleece",
    category: "knits",
    composition: "80% Combed Cotton / 20% Polyester",
    gsm: "450 GSM",
    shrinkage: "Under 3.0% (Enzyme Pre-shrunk)",
    printability: "Excellent for High-density Puff Ink & Embroidery",
    drapeRating: "Highly Structured, Boxy Streetwear Silhouette",
    softness: 4,
    features: ["Heavy Duty", "Anti-Pilling Fleece Backing", "ZeroSag Collar Compatible"]
  },
  {
    title: "Premium French Terry",
    category: "knits",
    composition: "100% Ring-Spun Organic Cotton",
    gsm: "400 GSM",
    shrinkage: "Under 2.5%",
    printability: "Ideal for detailed screen prints & flat embroidery",
    drapeRating: "Medium Structure, relaxed streetwear style",
    softness: 5,
    features: ["Bio-Washed", "Breathable Looped Backing", "Sustainable"]
  },
  {
    title: "Sustainable Bamboo Blend",
    category: "eco",
    composition: "70% Organic Bamboo / 30% Recycled Polyester",
    gsm: "220 GSM",
    shrinkage: "Under 4.0%",
    printability: "Excellent for water-based & discharge ink systems",
    drapeRating: "High Drape, extremely soft luxury touch",
    softness: 5,
    features: ["Certified GOTS/GRS", "Naturally Anti-Bacterial", "Cooling Handfeel"]
  },
  {
    title: "Supima Cotton Jersey",
    category: "knits",
    composition: "100% USA Supima Long-Staple Cotton",
    gsm: "240 GSM",
    shrinkage: "Under 2.0%",
    printability: "High definition direct-to-garment & screen printing",
    drapeRating: "Moderate Structure, premium luxury tee weight",
    softness: 5,
    features: ["Extra Long Staple", "Natural Silk-like Sheen", "Supreme Wash Durability"]
  },
  {
    title: "Technical Stretch Nylon",
    category: "performance",
    composition: "88% Recycled Nylon / 12% Spandex Ripstop",
    gsm: "180 GSM",
    shrinkage: "Negligible (<1%)",
    printability: "Best for reflective printing or silicon heat transfers",
    drapeRating: "Athletic drape, water-repellent shell structure",
    softness: 3,
    features: ["4-Way Stretch", "DWR Water Repellent", "Abrasion Resistant"]
  },
  {
    title: "Heavy Cotton Twill",
    category: "woven",
    composition: "100% Heavy Combed Cotton Twill",
    gsm: "320 GSM",
    shrinkage: "Under 3.0%",
    printability: "Best suited for custom direct embroidery or patches",
    drapeRating: "Stiff and rugged, perfect for cargo pants & jackets",
    softness: 3,
    features: ["Double Weave", "High Tensile Strength", "Vintage Dye Compatible"]
  }
];

export function Fabrics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFabrics = useMemo(() => {
    return fabricsList.filter(fabric => {
      const matchesSearch = fabric.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            fabric.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            fabric.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || fabric.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50/50 relative pb-24">
      {/* Hero Header */}
      <div className="absolute inset-0 z-0 h-[45vh]">
        <img 
          src="/assets/fabrics-hero.png" 
          alt="Duskyn premium custom fabrics library including organic cotton, technical blends, and French terry" 
          className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-slate-50" />
      </div>

      {/* Ambient Backlights */}
      <div className="absolute top-[35vh] left-10 w-[450px] h-[450px] bg-purple-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[55vh] right-10 w-[600px] h-[600px] bg-indigo-300/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 pt-44 px-4">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Fabric Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Explore our tech sheets, composition rates, and drape ratings. Select the ideal foundations for custom B2B production collections.
          </motion.p>
        </div>

        {/* Search and Filters panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-4 mb-10 border-white/60 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md"
        >
          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search fabrics, composition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/40 border border-black/10 focus:border-purple-500/50 focus:bg-white/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
            {[
              { id: 'all', name: 'All Fabrics' },
              { id: 'knits', name: 'Heavyweight Knits' },
              { id: 'eco', name: 'Sustainable / Eco' },
              { id: 'performance', name: 'Performance Tech' },
              { id: 'woven', name: 'Woven Twills' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                    : 'bg-white/45 border-black/5 text-slate-500 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Fabrics Bento Grid */}
        <AnimatePresence mode="popLayout">
          {filteredFabrics.length > 0 ? (
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFabrics.map((fabric, index) => (
                <motion.div
                  layout
                  key={fabric.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full glass border border-white/60 hover:bg-white/70 transition-all duration-300 group rounded-3xl flex flex-col justify-between overflow-hidden shadow-md">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100 text-[10px] tracking-wider text-purple-700 font-semibold uppercase">
                          {fabric.gsm}
                        </span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < fabric.softness ? 'text-purple-600 fill-purple-600' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      <CardTitle className="text-xl text-slate-900 mb-2 group-hover:text-purple-600 transition-colors font-bold">
                        {fabric.title}
                      </CardTitle>
                      
                      <CardDescription className="text-xs text-slate-500 font-medium mb-4">
                        {fabric.composition}
                      </CardDescription>

                      {/* Technical Specs List */}
                      <div className="space-y-2 border-t border-black/5 pt-4">
                        <div className="flex items-start gap-2.5 text-xs">
                          <Shield className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-slate-400 font-medium">Wash Tolerance: </span>
                            <span className="text-slate-700">{fabric.shrinkage}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs">
                          <Layers className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-slate-400 font-medium">Drape & Silhouette: </span>
                            <span className="text-slate-700">{fabric.drapeRating}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs">
                          <Droplet className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-slate-400 font-medium">Printing Adaptability: </span>
                            <span className="text-slate-700">{fabric.printability}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Features Tags Footer */}
                    <div className="p-6 pt-0 border-t border-black/5 mt-6 bg-black/[0.01]">
                      <div className="flex flex-wrap gap-1.5 pt-4">
                        {fabric.features.map((feature, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 bg-white/60 rounded-md text-[10px] text-slate-600 border border-black/5 font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass rounded-3xl border border-black/5 shadow-md"
            >
              <p className="text-slate-500 text-lg">No fabrics match your search criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
