'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  sort_order: number;
}

export default function TestimonialsEditor() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/admin/testimonials').then(r => r.json()).then(({ data }) => setItems(data || []));
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/testimonials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'Testimonials saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  const update = (i: number, field: string, val: string) => {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  };

  const add = () => {
    setItems(prev => [...prev, { id: `new-${Date.now()}`, name: '', location: '', text: '', sort_order: prev.length }]);
  };

  const remove = (i: number) => {
    setItems(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">Testimonials</h1>
          <p className="text-arch-gray text-sm mt-1">Manage client testimonials</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={add} className="text-arch-bronze text-xs uppercase tracking-[0.15em] hover:text-arch-bronze/80">+ Add</button>
          <SaveButton onClick={save} saving={saving} />
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        {items.map((item, i) => (
          <div key={item.id} className="bg-arch-dark p-6 border border-arch-gray/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-arch-bronze text-sm uppercase tracking-[0.15em]">Testimonial {i + 1}</h3>
              <button onClick={() => remove(i)} className="text-red-400 text-xs hover:text-red-300">Remove</button>
            </div>
            <TextField label="Name" value={item.name} onChange={(v) => update(i, 'name', v)} />
            <TextField label="Location" value={item.location} onChange={(v) => update(i, 'location', v)} />
            <TextField label="Testimonial Text" value={item.text} onChange={(v) => update(i, 'text', v)} multiline rows={4} />
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
