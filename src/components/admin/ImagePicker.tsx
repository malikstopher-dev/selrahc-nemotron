'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ImagePickerProps {
  images: string[];
  onChange: (images: string[]) => void;
  bucket?: string;
  max?: number;
  label?: string;
}

export default function ImagePicker({ images, onChange, bucket = 'media', max = 20, label = 'Images' }: ImagePickerProps) {
  const [uploading, setUploading] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryImages, setLibraryImages] = useState<{ url: string; alt_text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const upload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file, { contentType: file.type });
    if (!error) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onChange([...images, data.publicUrl]);
    }
    setUploading(false);
  };

  const openLibrary = async () => {
    const { data } = await supabase.from('media').select('url, alt_text').order('uploaded_at', { ascending: false });
    setLibraryImages(data || []);
    setShowLibrary(true);
  };

  const pickFromLibrary = (url: string) => {
    if (!images.includes(url)) {
      onChange([...images, url]);
    }
    setShowLibrary(false);
  };

  const remove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const next = [...images];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  return (
    <div>
      <label className="block text-white text-xs uppercase tracking-[0.15em] mb-3">{label}</label>

      {/* Current images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {images.map((url, i) => (
            <div key={`${url}-${i}`} className="group relative aspect-video bg-arch-black overflow-hidden border border-arch-gray/10">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <button
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="bg-white/20 text-white text-[10px] px-2 py-1 hover:bg-white/30 disabled:opacity-30"
                  title="Move up"
                >
                  ←
                </button>
                <button
                  onClick={() => moveDown(i)}
                  disabled={i === images.length - 1}
                  className="bg-white/20 text-white text-[10px] px-2 py-1 hover:bg-white/30 disabled:opacity-30"
                  title="Move down"
                >
                  →
                </button>
                <button
                  onClick={() => remove(i)}
                  className="bg-red-500/80 text-white text-[10px] px-2 py-1 hover:bg-red-500"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
              <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5">{i + 1}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading || images.length >= max}
          className="border border-dashed border-arch-gray/30 text-arch-gray text-xs uppercase tracking-[0.15em] px-4 py-3 hover:border-arch-bronze/50 hover:text-arch-bronze transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : '+ Upload Image'}
        </button>
        <button
          onClick={openLibrary}
          disabled={images.length >= max}
          className="border border-dashed border-arch-gray/30 text-arch-gray text-xs uppercase tracking-[0.15em] px-4 py-3 hover:border-arch-bronze/50 hover:text-arch-bronze transition-colors disabled:opacity-50"
        >
          + From Library
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = '';
          }}
        />
      </div>
      <p className="text-arch-gray/50 text-[11px] mt-2">{images.length}/{max} images</p>

      {/* Media library modal */}
      {showLibrary && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowLibrary(false)}>
          <div className="bg-arch-dark border border-arch-gray/10 max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-arch-gray/10">
              <h3 className="text-white text-sm uppercase tracking-[0.15em]">Media Library</h3>
              <button onClick={() => setShowLibrary(false)} className="text-arch-gray hover:text-white text-xl">✕</button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {libraryImages.length === 0 ? (
                <p className="text-arch-gray text-sm text-center py-8">No images in library. Upload some first.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {libraryImages.map((img) => {
                    const picked = images.includes(img.url);
                    return (
                      <button
                        key={img.url}
                        onClick={() => !picked && pickFromLibrary(img.url)}
                        disabled={picked}
                        className={`relative aspect-square overflow-hidden border-2 transition-colors ${picked ? 'border-arch-bronze opacity-50' : 'border-transparent hover:border-arch-bronze'}`}
                      >
                        <img src={img.url} alt={img.alt_text} className="w-full h-full object-cover" />
                        {picked && <span className="absolute top-1 right-1 bg-arch-bronze text-white text-[10px] px-1.5 py-0.5">Added</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
