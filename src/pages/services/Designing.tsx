import { motion } from 'framer-motion';
import { Card } from '../../components/ui/card';

export function Designing() {
    return (
        <div className="pt-20 min-h-screen bg-slate-50/50 relative">
            <div className="absolute inset-0 z-0 h-[60vh]">
                <img src="/assets/designing.png" alt="Duskyn streetwear fashion design, custom tech packs, and apparel fit prototyping" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-slate-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight">Designing</h1>
                    <p className="text-2xl text-slate-600 max-w-2xl font-light leading-relaxed">
                        From concept to technical pack. We design the future of streetwear.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 pb-20">
                    {[
                        { title: 'Tech Packs', desc: 'Detailed manufacturing specifications including measurements, fabrics, and grading rules.' },
                        { title: 'Pattern Making', desc: 'Digital pattern creation for perfect fits - Oversized, Boxy, Slim, or Custom.' },
                        { title: 'Trend Analysis', desc: 'Forecasting global streetwear trends to keep your brand ahead of the curve.' }
                    ].map((item, i) => (
                        <Card key={i} className="glass p-8 rounded-3xl border-white/60 shadow-md hover:-translate-y-2 transition-all duration-300 hover:bg-white/70">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                            <p className="text-slate-600">{item.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
