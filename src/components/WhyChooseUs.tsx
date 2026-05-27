import { ImageWithFallback } from './figma/ImageWithFallback';
import { Palette, TrendingUp, Clock, Tag, RefreshCw, ShieldCheck, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhyChooseUs() {
  const benefits = [
    { icon: Palette, title: 'Expert Designer Team', description: 'From concept to collection' },
    { icon: TrendingUp, title: 'Low MOQ', description: 'Perfect for startups' },
    { icon: Clock, title: 'Strict Timeline', description: 'On-time, every time' },
    { icon: Tag, title: 'Private Label', description: 'Build your brand identity' },
    { icon: RefreshCw, title: 'Regular Updates', description: 'Complete transparency' },
    { icon: ShieldCheck, title: 'Quality Control', description: 'Every product inspected' },
    { icon: Globe, title: 'Worldwide Shipping', description: 'Global delivery network' },
    { icon: Zap, title: 'End-to-End Solutions', description: 'Complete streetwear solutions' },
  ];

  return (
    <section id="why-choose-us" className="py-24 px-4 relative">
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-emerald-100/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-slate-900 tracking-tight"
          >
            Why Choose DUSKYN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            Your trusted B2B partner for premium streetwear manufacturing with a commitment
            to excellence, transparency, and timely delivery.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-4 p-6 glass rounded-2xl hover:bg-white/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900/5 flex items-center justify-center ring-1 ring-slate-950/10">
                  <Icon className="h-6 w-6 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 font-light">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Work Ethics Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-16 overflow-hidden relative"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-slate-900">Our Work Ethics</h2>
              <div className="space-y-8">
                {[
                  { icon: Clock, title: "Punctuality is Our Promise", desc: "We work on strict production schedules, ensuring no delays. Every order follows a precise timeline from start to finish." },
                  { icon: RefreshCw, title: "Transparency is Our Culture", desc: "You receive regular updates throughout production — from sourcing to final packaging. Communication is key." },
                  { icon: ShieldCheck, title: "Quality is Our Identity", desc: "Every product passes intense quality checks before dispatch. We ensure consistency and perfection in every piece." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-slate-900/5 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-slate-800" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden glass-card p-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-blue-500/5 mix-blend-overlay z-10 pointer-events-none" />
              <ImageWithFallback
                src="/assets/hero-main.png"
                alt="Duskyn state-of-the-art clothing manufacturing and cut & sew facility"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Commitment Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-slate-900"
          >
            Our Commitment
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 text-lg leading-relaxed space-y-4 font-light"
          >
            <p>
              At DUSKYN, we don't just create garments — we build global streetwear stories.
            </p>
            <p>
              Every piece reflects our dedication to design, discipline, and delivery. With a strong foundation
              in Indian manufacturing excellence and an eye on international fashion, DUSKYN helps brands grow
              confidently — one collection at a time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
