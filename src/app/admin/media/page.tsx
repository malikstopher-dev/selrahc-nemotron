'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';
import Toast from '@/components/admin/Toast';

interface MediaItem {
  id: string;
  url: string;
  alt_text: string;
  file_name: string;
  file_size: number;
  uploaded_at: string;
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    fetch('/api/admin/media').then(r => r.json()).then(({ data }) => setMedia(data || []));
  };

  const onUpload = (url: string) => {
    fetchMedia();
    setToast({ msg: 'Image uploaded', type: 'success' });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMedia(prev => prev.filter(m => m.id !== id));
      setToast({ msg: 'Deleted', type: 'success' });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-white">Media Library</h1>
        <p className="text-arch-gray text-sm mt-1">Upload and manage images</p>
      </div>

      <div className="max-w-2xl mb-8">
        <ImageUploader onUpload={onUpload} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {media.map((item) => (
          <div key={item.id} className="group relative aspect-square bg-arch-dark border border-arch-gray/10 overflow-hidden">
            <img src={item.url} alt={item.alt_text} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <button onClick={() => copyUrl(item.url)} className="text-white text-[10px] uppercase tracking-wider bg-arch-bronze px-3 py-1.5 hover:bg-arch-bronze/80">
                {copied === item.url ? 'Copied!' : 'Copy URL'}
              </button>
              <button onClick={() => remove(item.id)} className="text-red-300 text-[10px] uppercase tracking-wider hover:text-red-200">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
