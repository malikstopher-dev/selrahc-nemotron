'use client';

import { useState, useEffect } from 'react';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import Toast from '@/components/admin/Toast';

export default function ContactEditor() {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/content?locale=${locale}&section=contact`)
      .then(r => r.json())
      .then(({ data }) => {
        const content = data?.find((d: { key: string }) => d.key === 'contact');
        if (content?.value) {
          setTitle(content.value.title || '');
          setSubtitle(content.value.subtitle || '');
          setAddress(content.value.address || '');
          setPhone(content.value.phone || '');
          setEmail(content.value.email || '');
        }
      });
  }, [locale]);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: 'contact',
        locale,
        section: 'contact',
        value: { title, subtitle, address, phone, email },
      }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'Contact info saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">Contact Info</h1>
          <p className="text-arch-gray text-sm mt-1">Edit contact page content and details</p>
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
        <TextField label="Page Title" value={title} onChange={setTitle} />
        <TextField label="Subtitle" value={subtitle} onChange={setSubtitle} />
        <TextField label="Address" value={address} onChange={setAddress} multiline rows={3} />
        <TextField label="Phone" value={phone} onChange={setPhone} />
        <TextField label="Email" value={email} onChange={setEmail} />
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
