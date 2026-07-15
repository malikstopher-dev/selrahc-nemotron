'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export default function FaqEditor() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/admin/faq').then(r => r.json()).then(({ data }) => setItems(data || []));
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/faq', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'FAQ saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  const update = (i: number, field: string, val: string) => {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  };

  const add = () => {
    setItems(prev => [...prev, { id: `new-${Date.now()}`, question: '', answer: '', sort_order: prev.length }]);
  };

  const remove = (i: number) => {
    setItems(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">FAQ</h1>
          <p className="text-arch-gray text-sm mt-1">Manage frequently asked questions</p>
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
              <h3 className="text-arch-bronze text-sm uppercase tracking-[0.15em]">Question {i + 1}</h3>
              <button onClick={() => remove(i)} className="text-red-400 text-xs hover:text-red-300">Remove</button>
            </div>
            <TextField label="Question" value={item.question} onChange={(v) => update(i, 'question', v)} />
            <TextField label="Answer" value={item.answer} onChange={(v) => update(i, 'answer', v)} multiline rows={4} />
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
