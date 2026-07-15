'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

export default function ServicesEditor() {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [items, setItems] = useState<{ title: string; desc: string }[]>([]);
  const [specs, setSpecs] = useState({ title: '', rendering: '', sketch: '', interior: '', visualization: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/content?locale=${locale}&section=services`)
      .then(r => r.json())
      .then(({ data }) => {
        const content = data?.find((d: { key: string }) => d.key === 'services');
        if (content?.value) {
          setTitle(content.value.title || '');
          setSubtitle(content.value.subtitle || '');
          setItems(content.value.items || []);
          setSpecs(content.value.specializations || specs);
        }
      });
  }, [locale]);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: 'services',
        locale,
        section: 'services',
        value: { title, subtitle, items, specializations: specs },
      }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'Services saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  const updateItem = (i: number, field: 'title' | 'desc', val: string) => {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">Services</h1>
          <p className="text-arch-gray text-sm mt-1">Edit service descriptions and specializations</p>
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
          <TextField label="Title" value={title} onChange={setTitle} />
          <TextField label="Subtitle" value={subtitle} onChange={setSubtitle} />
        </div>

        <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6">
          <h2 className="text-white text-sm uppercase tracking-[0.15em]">Services</h2>
          {items.map((item, i) => (
            <div key={i} className="border-b border-arch-gray/10 pb-4 last:border-0">
              <TextField label={`Service ${i + 1} Title`} value={item.title} onChange={(v) => updateItem(i, 'title', v)} />
              <div className="mt-3">
                <TextField label="Description" value={item.desc} onChange={(v) => updateItem(i, 'desc', v)} multiline rows={3} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6">
          <h2 className="text-white text-sm uppercase tracking-[0.15em]">Specializations</h2>
          <TextField label="Section Title" value={specs.title} onChange={(v) => setSpecs(p => ({ ...p, title: v }))} />
          <TextField label="Photorealistic Visualisation" value={specs.rendering} onChange={(v) => setSpecs(p => ({ ...p, rendering: v }))} />
          <TextField label="Conceptual Sketch Rendering" value={specs.sketch} onChange={(v) => setSpecs(p => ({ ...p, sketch: v }))} />
          <TextField label="Interior Architecture" value={specs.interior} onChange={(v) => setSpecs(p => ({ ...p, interior: v }))} />
          <TextField label="3D Development" value={specs.visualization} onChange={(v) => setSpecs(p => ({ ...p, visualization: v }))} />
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
