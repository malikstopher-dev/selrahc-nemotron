'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

export default function AboutEditor() {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [founderName, setFounderName] = useState('');
  const [founderTitle, setFounderTitle] = useState('');
  const [founderBio, setFounderBio] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [values, setValues] = useState<Record<string, { title: string; desc: string }>>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/content?locale=${locale}&section=about`)
      .then(r => r.json())
      .then(({ data }) => {
        const content = data?.find((d: { key: string }) => d.key === 'about');
        if (content?.value) {
          const v = content.value;
          setTitle(v.title || '');
          setSubtitle(v.subtitle || '');
          setFounderName(v.founderName || '');
          setFounderTitle(v.founderTitle || '');
          setFounderBio(v.founderBio || '');
          setMission(v.mission || '');
          setVision(v.vision || '');
          setValues(v.values || {});
        }
      });
  }, [locale]);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: 'about',
        locale,
        section: 'about',
        value: { title, subtitle, founderName, founderTitle, founderBio, mission, vision, values },
      }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'About content saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  const updateValue = (key: string, field: 'title' | 'desc', val: string) => {
    setValues(prev => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">About Page</h1>
          <p className="text-arch-gray text-sm mt-1">Edit founder info, mission, vision, and values</p>
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
          <h2 className="text-white text-sm uppercase tracking-[0.15em]">Page Content</h2>
          <TextField label="Page Title" value={title} onChange={setTitle} />
          <TextField label="Subtitle" value={subtitle} onChange={setSubtitle} />
        </div>

        <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6">
          <h2 className="text-white text-sm uppercase tracking-[0.15em]">Founder</h2>
          <TextField label="Name" value={founderName} onChange={setFounderName} />
          <TextField label="Title" value={founderTitle} onChange={setFounderTitle} />
          <TextField label="Bio" value={founderBio} onChange={setFounderBio} multiline rows={5} />
        </div>

        <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6">
          <h2 className="text-white text-sm uppercase tracking-[0.15em]">Mission & Vision</h2>
          <TextField label="Mission" value={mission} onChange={setMission} multiline rows={3} />
          <TextField label="Vision" value={vision} onChange={setVision} multiline rows={3} />
        </div>

        <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6">
          <h2 className="text-white text-sm uppercase tracking-[0.15em]">Values</h2>
          {Object.entries(values).map(([key, val]) => (
            <div key={key} className="border-b border-arch-gray/10 pb-4 last:border-0">
              <TextField label={`${key.charAt(0).toUpperCase() + key.slice(1)} Title`} value={val.title} onChange={(v) => updateValue(key, 'title', v)} />
              <div className="mt-3">
                <TextField label="Description" value={val.desc} onChange={(v) => updateValue(key, 'desc', v)} multiline rows={3} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
