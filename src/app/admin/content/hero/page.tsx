'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import ImagePicker from '@/components/admin/ImagePicker';
import Toast from '@/components/admin/Toast';
import { dictionaries } from '@/i18n/dictionary';

export default function HeroEditor() {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const defaults = dictionaries[locale].hero;
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [ctaPrimary, setCtaPrimary] = useState('');
  const [ctaSecondary, setCtaSecondary] = useState('');
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/content?locale=${locale}&section=hero`)
      .then(r => r.json())
      .then(({ data }) => {
        const content = data?.find((d: { key: string }) => d.key === 'hero');
        const v = content?.value;
        setHeadline(v?.headline || defaults.headline);
        setSubheadline(v?.subheadline || defaults.subheadline);
        setCtaPrimary(v?.ctaPrimary || defaults.ctaPrimary);
        setCtaSecondary(v?.ctaSecondary || defaults.ctaSecondary);
        setHeroImages(v?.heroImages || []);
      })
      .catch(() => {
        setHeadline(defaults.headline);
        setSubheadline(defaults.subheadline);
        setCtaPrimary(defaults.ctaPrimary);
        setCtaSecondary(defaults.ctaSecondary);
      });
  }, [locale, defaults]);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: 'hero',
        locale,
        section: 'hero',
        value: { headline, subheadline, ctaPrimary, ctaSecondary, heroImages },
      }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'Hero content saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">Hero Section</h1>
          <p className="text-arch-gray text-sm mt-1">Edit the homepage hero content and slideshow images</p>
        </div>
        <div className="flex items-center gap-4">
          <select value={locale} onChange={(e) => setLocale(e.target.value as 'en' | 'fr')} className="bg-arch-black text-white px-4 py-2 border border-arch-gray/20 text-sm">
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          <SaveButton onClick={save} saving={saving} />
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6">
          <h2 className="text-white text-sm uppercase tracking-[0.15em]">Text Content</h2>
          <TextField label="Headline" value={headline} onChange={setHeadline} placeholder="Architecture That Transforms..." />
          <TextField label="Subheadline" value={subheadline} onChange={setSubheadline} multiline rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Primary CTA" value={ctaPrimary} onChange={setCtaPrimary} placeholder="View Portfolio" />
            <TextField label="Secondary CTA" value={ctaSecondary} onChange={setCtaSecondary} placeholder="Schedule Consultation" />
          </div>
        </div>

        <div className="bg-arch-dark p-6 border border-arch-gray/10">
          <ImagePicker
            images={heroImages}
            onChange={setHeroImages}
            label="Slideshow Images"
            max={12}
          />
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
