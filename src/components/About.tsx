import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function About() {
  const features = [
    { title: "Design to Delivery", desc: "Complete support from concept to final product" },
    { title: "Low MOQ, High Quality", desc: "Perfect for both startups and established labels" },
    { title: "No Delays, No Excuses", desc: "We strictly follow production timelines" },
    { title: "Regular Updates", desc: "From fabric sourcing to dispatch, we keep you informed" },
    { title: "Every Product Quality-Checked", desc: "Each garment passes our strict inspection process" },
    { title: "Worldwide Shipping", desc: "Serving brands across the globe" }
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">About DUSKYN</h2>
            <div className="space-y-6 text-lg text-slate-700">
              <p>
                DUSKYN is a premium streetwear manufacturer and global exporter, delivering high-quality menswear
                to fashion labels and startup brands around the world.
              </p>
              <p>
                We're not just manufacturers — we're your creative production partners. From design to final dispatch,
                we handle every step with precision, passion, and purpose.
              </p>
              <p>
                Whether you're launching your first collection or scaling your global brand, DUSKYN ensures world-class
                production quality, startup-friendly flexibility, and zero-delay timelines.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden glass-card p-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 z-10 pointer-events-none" />
            <ImageWithFallback
              src="/assets/pattern-making.png"
              alt="Duskyn high-quality premium apparel production line and fabric inspection"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>
        </div>

        {/* What Makes Us Different */}
        <div className="glass rounded-3xl p-8 md:p-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900"
          >
            What Makes DUSKYN Different
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/[0.02] transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-slate-900/5 flex items-center justify-center border border-slate-900/10">
                    <Check className="w-4 h-4 text-slate-800" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
