import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleApplyQuote = (e: Event) => {
      const customEvent = e as CustomEvent<{ subject: string; message: string }>;
      if (customEvent.detail) {
        setFormData(prev => ({
          ...prev,
          subject: customEvent.detail.subject,
          message: customEvent.detail.message
        }));
      }
    };

    window.addEventListener('duskyn-apply-quote', handleApplyQuote);
    return () => {
      window.removeEventListener('duskyn-apply-quote', handleApplyQuote);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      toast.success('Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-slate-900">Get in Touch</h2>
            <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
              Ready to start your production journey? Contact us for quotes, samples, or general inquiries.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-xl shadow-sm border-white/60">
                  <MapPin className="h-6 w-6 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Visit Us</h3>
                  <p className="text-slate-600">
                    Dusky Apparels LLP<br />
                    C43, Block C, Sector 88<br />
                    Noida, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-xl shadow-sm border-white/60">
                  <Mail className="h-6 w-6 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Email Us</h3>
                  <p className="text-slate-600">support@duskyn.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 glass rounded-xl shadow-sm border-white/60">
                  <Phone className="h-6 w-6 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Call Us</h3>
                  <p className="text-slate-600">+91 9220932011</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-3xl shadow-lg border-white/60"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="John Doe"
                    className="bg-white/40 border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-purple-500/50 focus:bg-white/60 focus:ring-0 rounded-xl py-6 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="john@brand.com"
                    className="bg-white/40 border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-purple-500/50 focus:bg-white/60 focus:ring-0 rounded-xl py-6 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Subject</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Production Inquiry"
                  className="bg-white/40 border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-purple-500/50 focus:bg-white/60 focus:ring-0 rounded-xl py-6 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Tell us about your project..."
                  className="min-h-[150px] bg-white/40 border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-purple-500/50 focus:bg-white/60 focus:ring-0 rounded-xl resize-none transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full h-14 bg-slate-950 text-white hover:bg-slate-800 rounded-xl text-lg font-medium flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
