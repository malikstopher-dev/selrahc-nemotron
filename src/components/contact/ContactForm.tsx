'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useLanguage } from '@/i18n/LanguageProvider';
import BlueprintField from './BlueprintField';
import BlueprintTextarea from './BlueprintTextarea';
import BlueprintSelect from './BlueprintSelect';
import BlueprintGrid from './BlueprintGrid';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

interface ContactFormProps {
  onSubmitSuccess?: () => void;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
};

export default function ContactForm({ onSubmitSuccess }: ContactFormProps) {
  const { dict, locale } = useLanguage();
  const f = dict.contact.form;

  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!submitRef.current) return;
      gsap.fromTo(
        submitRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power4.out' }
      );
    },
    { scope: formRef, dependencies: [] }
  );

  useGSAP(
    () => {
      if (!successRef.current || !submitted) return;
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }
      );
    },
    { scope: successRef, dependencies: [submitted] }
  );

  const updateField = (name: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) nextErrors.name = f.nameRequired;
    if (!formData.email.trim()) nextErrors.email = f.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = f.emailInvalid;
    if (!formData.message.trim()) nextErrors.message = f.messageRequired;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
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
        body: JSON.stringify({ ...formData, _hp: honeypot }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      setFormData(initialFormData);
      onSubmitSuccess?.();
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  const budgetOptions = [
    { value: 'under-100k', label: locale === 'en' ? 'Under R100k' : 'Moins de R100k' },
    { value: '100k-500k', label: locale === 'en' ? 'R100k – R500k' : 'R100k – R500k' },
    { value: '500k-1m', label: locale === 'en' ? 'R500k – R1m' : 'R500k – R1m' },
    { value: '1m-3m', label: locale === 'en' ? 'R1m – R3m' : 'R1m – R3m' },
    { value: '3m-plus', label: locale === 'en' ? 'R3m+' : 'R3m+' },
  ];

  const projectTypeOptions = [
    { value: 'residential', label: locale === 'en' ? 'Residential' : 'Résidentiel' },
    { value: 'renovation', label: locale === 'en' ? 'Renovation' : 'Rénovation' },
    { value: 'commercial', label: locale === 'en' ? 'Commercial' : 'Commercial' },
    { value: 'interior', label: locale === 'en' ? 'Interior' : 'Intérieur' },
    { value: 'hospitality', label: locale === 'en' ? 'Hospitality' : 'Hôtellerie' },
    { value: 'other', label: locale === 'en' ? 'Other' : 'Autre' },
  ];

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="p-8 md:p-12 border border-arch-bronze/30 bg-arch-white"
      >
        <p className="font-heading text-xl md:text-2xl text-arch-black text-center">
          {f.success}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6 md:space-y-8">
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="_hp">Leave empty</label>
        <input
          id="_hp"
          name="_hp"
          type="text"
          value={honeypot}
          onChange={() => setHoneypot('')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <BlueprintField
          label={f.name}
          name="name"
          value={formData.name}
          required
          error={errors.name}
          onChange={updateField('name')}
        />
        <BlueprintField
          label={f.email}
          name="email"
          type="email"
          value={formData.email}
          required
          error={errors.email}
          onChange={updateField('email')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <BlueprintField
          label={f.phone}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={updateField('phone')}
        />
        <BlueprintSelect
          label={f.budget}
          name="budget"
          value={formData.budget}
          options={budgetOptions}
          placeholder={f.budget}
          onChange={updateField('budget')}
        />
      </div>

      <BlueprintGrid
        label={f.projectType}
        name="projectType"
        value={formData.projectType}
        options={projectTypeOptions}
        onChange={updateField('projectType')}
      />

      <BlueprintTextarea
        label={f.message}
        name="message"
        value={formData.message}
        required
        error={errors.message}
        rows={5}
        onChange={updateField('message')}
      />

      {submitError && (
        <p className="text-red-500 text-sm">{f.error}</p>
      )}

      <button
        ref={submitRef}
        type="submit"
        disabled={loading}
        className="w-full text-center text-xs uppercase tracking-[0.2em] px-8 py-4 bg-arch-black text-white hover:bg-arch-dark transition-all duration-300 min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (locale === 'en' ? 'Sending...' : 'Envoi...') : f.submit}
      </button>
    </form>
  );
}
