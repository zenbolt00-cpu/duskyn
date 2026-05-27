import { motion } from 'framer-motion';
import { Card } from '../../components/ui/card';

export function ScreenPrinting() {
    return (
        <div className="pt-20 min-h-screen bg-slate-50/50 relative">
            <div className="absolute inset-0 z-0 h-[60vh]">
                <img src="/assets/screen-printing.png" alt="Duskyn industrial textile screen printing machine producing custom vibrant streetwear graphics" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-slate-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight">Screen Printing</h1>
                    <p className="text-2xl text-slate-600 max-w-2xl font-light leading-relaxed">
                        Vibrant inks. Durable finishes. Artistic expression.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 pb-20">
                    <Card className="glass p-8 rounded-3xl border-white/60 shadow-lg">
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Techniques</h3>
                        <ul className="space-y-4 text-slate-700 text-lg">
                            <li>• Plastisol (Standard & Soft Hand)</li>
                            <li>• Water-based & Discharge</li>
                            <li>• High Density (HD) & Puff</li>
                            <li>• Foil & Metallic</li>
                            <li>• Glow in the Dark</li>
                        </ul>
                    </Card>
                    <Card className="glass p-8 rounded-3xl border-white/60 shadow-lg">
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Quality</h3>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            We use premium inks that ensure wash durability and color vibrancy.
                            From massive oversized back prints to detailed chest logos, our screens capture every pixel.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
