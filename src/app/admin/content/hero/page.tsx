'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

export default function HeroEditor() {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [ctaPrimary, setCtaPrimary] = useState('');
  const [ctaSecondary, setCtaSecondary] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/content?locale=${locale}&section=hero`)
      .then(r => r.json())
      .then(({ data }) => {
        const content = data?.find((d: { key: string }) => d.key === 'hero');
        if (content?.value) {
          setHeadline(content.value.headline || '');
          setSubheadline(content.value.subheadline || '');
          setCtaPrimary(content.value.ctaPrimary || '');
          setCtaSecondary(content.value.ctaSecondary || '');
        }
      });
  }, [locale]);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: 'hero',
        locale,
        section: 'hero',
        value: { headline, subheadline, ctaPrimary, ctaSecondary },
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
          <p className="text-arch-gray text-sm mt-1">Edit the homepage hero content</p>
        </div>
        <div className="flex items-center gap-4">
          <select value={locale} onChange={(e) => setLocale(e.target.value as 'en' | 'fr')} className="bg-arch-black text-white px-4 py-2 border border-arch-gray/20 text-sm">
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          <SaveButton onClick={save} saving={saving} />
        </div>
      </div>

      <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6 max-w-3xl">
        <TextField label="Headline" value={headline} onChange={setHeadline} placeholder="Architecture That Transforms..." />
        <TextField label="Subheadline" value={subheadline} onChange={setSubheadline} multiline rows={3} />
        <TextField label="Primary CTA" value={ctaPrimary} onChange={setCtaPrimary} placeholder="Schedule a Design Consultation" />
        <TextField label="Secondary CTA" value={ctaSecondary} onChange={setCtaSecondary} placeholder="View Selected Works" />
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
