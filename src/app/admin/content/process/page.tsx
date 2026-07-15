'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

export default function ProcessEditor() {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [steps, setSteps] = useState<{ title: string; desc: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/content?locale=${locale}&section=process`)
      .then(r => r.json())
      .then(({ data }) => {
        const content = data?.find((d: { key: string }) => d.key === 'process');
        if (content?.value) {
          setTitle(content.value.title || '');
          setSubtitle(content.value.subtitle || '');
          setSteps(content.value.steps || []);
        }
      });
  }, [locale]);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'process', locale, section: 'process', value: { title, subtitle, steps } }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'Process saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  const updateStep = (i: number, field: 'title' | 'desc', val: string) => {
    setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">Process</h1>
          <p className="text-arch-gray text-sm mt-1">Edit the 6-stage process steps</p>
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
          <TextField label="Title" value={title} onChange={setTitle} />
          <TextField label="Subtitle" value={subtitle} onChange={setSubtitle} />
        </div>

        {steps.map((step, i) => (
          <div key={i} className="bg-arch-dark p-6 border border-arch-gray/10 space-y-4">
            <h3 className="text-arch-bronze text-sm uppercase tracking-[0.15em]">Step {i + 1}</h3>
            <TextField label="Title" value={step.title} onChange={(v) => updateStep(i, 'title', v)} />
            <TextField label="Description" value={step.desc} onChange={(v) => updateStep(i, 'desc', v)} multiline rows={3} />
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
