'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import RevealText from '@/components/ui/RevealText';

export default function ContactPage() {
  const { dict, locale } = useLanguage();
  const f = dict.contact.form;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const honeypotRef = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = dict.contact.form.nameRequired;
    if (!formData.email.trim()) newErrors.email = dict.contact.form.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = dict.contact.form.emailInvalid;
    if (!formData.message.trim()) newErrors.message = dict.contact.form.messageRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(false);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _hp: honeypotRef[0] }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' });
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => { const next = { ...prev }; delete next[e.target.name]; return next; });
    }
  };

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-black">
        <div className="container-main">
          <SectionTitle title={dict.contact.title} subtitle={dict.contact.subtitle} />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <RevealText>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl text-arch-black mb-2">Selrahc Architects</h3>
                  <p className="text-arch-gray text-sm md:text-base whitespace-pre-line leading-relaxed">{dict.contact.address}</p>
                </div>
                <div>
                  <p className="text-arch-gray text-sm md:text-base">
                    <strong className="text-arch-black">{dict.contact.phoneLabel}:</strong>{' '}
                    <a href={`tel:${dict.contact.phone.replace(/\s/g, '')}`} className="hover:text-arch-bronze transition-colors">{dict.contact.phone}</a>
                  </p>
                  <p className="text-arch-gray text-sm md:text-base mt-2">
                    <strong className="text-arch-black">Email:</strong>{' '}
                    <a href={`mailto:${dict.contact.email}`} className="hover:text-arch-bronze transition-colors break-all">{dict.contact.email}</a>
                  </p>
                </div>
              </div>
            </RevealText>

            <RevealText delay={0.2}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8 bg-arch-white border border-arch-bronze/30">
                  <p className="text-arch-black font-heading text-lg md:text-xl">{dict.contact.form.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-5">
                  <div aria-hidden="true" className="absolute left-[-9999px]">
                    <label htmlFor="_hp">Leave empty</label>
                    <input id="_hp" name="_hp" type="text" value={honeypotRef[0]} onChange={() => {}} tabIndex={-1} autoComplete="off" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.name}</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder={f.name} required aria-label={f.name}
                      className={`w-full px-4 py-3.5 md:py-4 border bg-transparent text-arch-black placeholder:text-arch-gray/50 text-sm focus:outline-none focus:border-arch-bronze transition-colors ${errors.name ? 'border-red-400' : 'border-arch-gray/20'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.email}</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder={f.email} required aria-label={f.email}
                      className={`w-full px-4 py-3.5 md:py-4 border bg-transparent text-arch-black placeholder:text-arch-gray/50 text-sm focus:outline-none focus:border-arch-bronze transition-colors ${errors.email ? 'border-red-400' : 'border-arch-gray/20'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.phone}</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder={f.phone} aria-label={f.phone}
                      className="w-full px-4 py-3.5 md:py-4 border border-arch-gray/20 bg-transparent text-arch-black placeholder:text-arch-gray/50 text-sm focus:outline-none focus:border-arch-bronze transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.projectType}</label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange} aria-label={f.projectType}
                      className="w-full px-4 py-3.5 md:py-4 border border-arch-gray/20 bg-transparent text-arch-black text-sm focus:outline-none focus:border-arch-bronze transition-colors">
                      <option value="">{dict.contact.form.projectType}</option>
                      <option value="residential">{locale === 'en' ? 'Residential' : 'Résidentiel'}</option>
                      <option value="renovation">{locale === 'en' ? 'Renovation' : 'Rénovation'}</option>
                      <option value="commercial">{locale === 'en' ? 'Commercial' : 'Commercial'}</option>
                      <option value="interior">{locale === 'en' ? 'Interior Design' : 'Design d\'Intérieur'}</option>
                      <option value="other">{locale === 'en' ? 'Other' : 'Autre'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.budget}</label>
                    <input
                      type="text" name="budget" value={formData.budget} onChange={handleChange}
                      placeholder={f.budget} aria-label={f.budget}
                      className="w-full px-4 py-3.5 md:py-4 border border-arch-gray/20 bg-transparent text-arch-black placeholder:text-arch-gray/50 text-sm focus:outline-none focus:border-arch-bronze transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.message}</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      placeholder={f.message} required aria-label={f.message}
                      rows={5}
                      className={`w-full px-4 py-3.5 md:py-4 border bg-transparent text-arch-black placeholder:text-arch-gray/50 text-sm focus:outline-none focus:border-arch-bronze transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-arch-gray/20'}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                  </div>
                  {submitError && <p className="text-red-500 text-sm">{dict.contact.form.error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full text-center text-xs uppercase tracking-[0.2em] px-8 py-4 bg-arch-black text-white hover:bg-arch-dark transition-all duration-300 min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (locale === 'en' ? 'Sending...' : 'Envoi...') : dict.contact.form.submit}
                  </button>
                </form>
              )}
            </RevealText>
          </div>
        </div>
      </section>
    </>
  );
}
