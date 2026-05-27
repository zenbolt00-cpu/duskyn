import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tag, Palette, Lightbulb, Shirt, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function Services() {
  const services = [
    {
      icon: Tag,
      title: 'Private Label Manufacturing',
      description: 'We bring your vision to life through private labeling, handling everything from design, sampling, and branding to packaging — helping you create your own fashion identity.',
    },
    {
      icon: Palette,
      title: 'Expert Designer Team',
      description: 'Our in-house design team understands the pulse of global streetwear. We help you create styles that connect with Gen Z, urban culture, and modern fashion trends — turning your ideas into ready-to-sell collections.',
    },
    {
      icon: Lightbulb,
      title: 'Sampling & Product Development',
      description: 'From fabric selection to fit perfection, every sample is crafted with attention to detail and precision, ensuring you get what you imagined — or better.',
    },
    {
      icon: Shirt,
      title: 'All Menswear Categories',
      description: 'We manufacture T-Shirts, Hoodies, Sweatshirts, Cargo Pants, Joggers, Denim, Co-ord Sets, Overshirts, Jackets, Casuals, Smart Casuals, and Streetwear Essentials.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Control',
      description: 'Every single product goes through a multi-stage quality inspection — checking fabric, stitching, measurements, and finishing. We make sure every piece shipped under the DUSKYN name stands for perfection and consistency.',
    },
    {
      icon: Globe,
      title: 'Global Export & Logistics',
      description: 'We handle custom documentation, duties, and global shipping networks — delivering your custom collections securely to any warehouse or retail storefront worldwide.',
    },
  ];

  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-blue-100/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-slate-900 tracking-tight"
          >
            Our Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            Complete manufacturing solutions from design to delivery —
            helping fashion brands create collections that stand out.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full glass border border-white/50 hover:bg-white/60 transition-colors group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-slate-900/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-slate-950/10">
                      <Icon className="h-7 w-7 text-slate-800" />
                    </div>
                    <CardTitle className="text-xl text-slate-900 mb-2 font-bold">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
