'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TextField from '@/components/admin/TextField';
import SaveButton from '@/components/admin/SaveButton';
import ImageUploader from '@/components/admin/ImageUploader';
import Toast from '@/components/admin/Toast';

export default function ProjectEditor() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('residential');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<{ id: string; image_url: string; alt_text: string; sort_order: number }[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/projects/${id}`);
    if (!res.ok) { router.push('/admin/projects'); return; }
    const { data } = await res.json();
    setTitle(data.title);
    setCategory(data.category);
    setLocation(data.location);
    setYear(data.year);
    setDescription(data.description);
    setImages(data.images || []);
  }, [id, router]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, location, year, description }),
    });
    setSaving(false);
    setToast(res.ok ? { msg: 'Project saved', type: 'success' } : { msg: 'Failed to save', type: 'error' });
  };

  const onUpload = async (url: string) => {
    const res = await fetch('/api/admin/projects/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: id, image_url: url, sort_order: images.length }),
    });
    if (res.ok) {
      const { data } = await res.json();
      setImages(prev => [...prev, data]);
      setToast({ msg: 'Image added', type: 'success' });
    }
  };

  const removeImage = async (imgId: string) => {
    const res = await fetch(`/api/admin/projects/images?id=${imgId}`, { method: 'DELETE' });
    if (res.ok) {
      setImages(prev => prev.filter(i => i.id !== imgId));
      setToast({ msg: 'Image removed', type: 'success' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">Edit Project</h1>
          <p className="text-arch-gray text-sm mt-1">{id}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/projects')} className="text-arch-gray text-xs uppercase tracking-[0.15em] hover:text-white">Back</button>
          <SaveButton onClick={save} saving={saving} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-6">
            <TextField label="Title" value={title} onChange={setTitle} />
            <div>
              <label className="block text-white text-xs uppercase tracking-[0.15em] mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-arch-black text-white px-4 py-3 border border-arch-gray/20 text-sm">
                <option value="residential">Residential</option>
                <option value="renovations">Renovations</option>
                <option value="interior">Interior</option>
                <option value="conceptual">Conceptual</option>
                <option value="renderings">Renderings</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Location" value={location} onChange={setLocation} />
              <TextField label="Year" value={year} onChange={setYear} />
            </div>
            <TextField label="Description" value={description} onChange={setDescription} multiline rows={8} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-arch-dark p-6 border border-arch-gray/10 space-y-4">
            <h2 className="text-white text-sm uppercase tracking-[0.15em]">Images</h2>
            <ImageUploader onUpload={onUpload} bucket="project-images" />
            <div className="grid grid-cols-2 gap-2 mt-4">
              {images.map((img) => (
                <div key={img.id} className="relative group aspect-video bg-arch-black overflow-hidden">
                  <img src={img.image_url} alt={img.alt_text} className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(img.id)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
