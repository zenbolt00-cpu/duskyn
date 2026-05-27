import { motion } from 'framer-motion';

export function Stats() {
  const stats = [
    { number: '100+', label: 'Global Brands Served' },
    { number: '50K+', label: 'Garments Produced Monthly' },
    { number: '25+', label: 'Countries Exported To' },
    { number: '100%', label: 'On-Time Delivery Rate' },
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-2xl text-center hover:bg-white/60 transition-colors group border-white/60 shadow-sm"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
