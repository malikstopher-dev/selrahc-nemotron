'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageProvider';
import SectionTitle from '@/components/ui/SectionTitle';
import RevealText from '@/components/ui/RevealText';

export default function QuotePage() {
  const { dict, locale } = useLanguage();
  const f = dict.quote.form;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', projectType: '', budget: '', description: '', file: null as File | null });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch {
      setError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    if (target instanceof HTMLInputElement && target.type === 'file') {
      setFormData(prev => ({ ...prev, file: target.files?.[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: target.value }));
    }
  };

  const inputClass = "w-full px-4 py-3.5 md:py-4 border border-arch-gray/20 bg-transparent text-arch-black placeholder:text-arch-gray/50 text-sm focus:outline-none focus:border-arch-bronze transition-colors";

  return (
    <>
      <section className="pt-24 pb-12 md:pt-40 md:pb-24 bg-arch-black">
        <div className="container-main">
          <SectionTitle title={dict.quote.title} subtitle={dict.quote.subtitle} />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container-main max-w-3xl mx-auto">
          <RevealText>
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-10 bg-arch-white border border-arch-bronze/30 text-center">
                <p className="text-arch-black font-heading text-xl md:text-2xl">{f.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.name}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={f.name} required aria-label={f.name} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.email}</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={f.email} required aria-label={f.email} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.phone}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={f.phone} required aria-label={f.phone} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.location}</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder={f.location} required aria-label={f.location} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.projectType}</label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange} required aria-label={f.projectType} className={inputClass}>
                      <option value="">{f.projectType}</option>
                      <option value="residential">{locale === 'en' ? 'Residential' : 'Résidentiel'}</option>
                      <option value="renovation">{locale === 'en' ? 'Renovation' : 'Rénovation'}</option>
                      <option value="commercial">{locale === 'en' ? 'Commercial' : 'Commercial'}</option>
                      <option value="interior">{locale === 'en' ? 'Interior Design' : "Design d'Intérieur"}</option>
                      <option value="other">{locale === 'en' ? 'Other' : 'Autre'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.budget}</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} required aria-label={f.budget} className={inputClass}>
                      <option value="">{f.budget}</option>
                      <option value="under-500k">{locale === 'en' ? 'Under R500,000' : 'Moins de R500,000'}</option>
                      <option value="500k-1m">R500,000 - R1,000,000</option>
                      <option value="1m-3m">R1,000,000 - R3,000,000</option>
                      <option value="3m-5m">R3,000,000 - R5,000,000</option>
                      <option value="over-5m">{locale === 'en' ? 'Over R5,000,000' : 'Plus de R5,000,000'}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-1.5">{f.description}</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder={f.description} required aria-label={f.description} rows={5} className={`${inputClass} resize-none`} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] text-arch-gray mb-2">{f.upload}</label>
                  <input type="file" name="file" onChange={handleChange}
                    className="w-full text-sm text-arch-gray file:mr-4 file:py-2.5 file:px-4 file:border file:border-arch-gray/20 file:text-xs file:uppercase file:tracking-[0.15em] file:bg-transparent file:text-arch-black hover:file:bg-arch-black hover:file:text-white file:transition-colors file:cursor-pointer file:min-h-[44px]" />
                </div>
                {error && <p className="text-red-500 text-sm">{f.error}</p>}
                <button type="submit"
                  className="w-full text-center text-xs uppercase tracking-[0.2em] px-8 py-4 bg-arch-black text-white hover:bg-arch-dark transition-all duration-300 min-h-[52px]"
                >
                  {f.submit}
                </button>
              </form>
            )}
          </RevealText>
        </div>
      </section>
    </>
  );
}
