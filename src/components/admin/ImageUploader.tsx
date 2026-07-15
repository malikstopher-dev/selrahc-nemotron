'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  bucket?: string;
}

export default function ImageUploader({ onUpload, bucket = 'media' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const upload = async (file: File) => {
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file, { contentType: file.type });

    if (!error) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onUpload(data.publicUrl);
    }

    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) upload(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${dragOver ? 'border-arch-bronze bg-arch-bronze/5' : 'border-arch-gray/30 hover:border-arch-bronze/50'}`}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) upload(file);
      }} />
      {uploading ? (
        <p className="text-arch-gray text-sm">Uploading...</p>
      ) : (
        <>
          <svg className="w-8 h-8 mx-auto text-arch-gray/50 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <p className="text-arch-gray text-sm">Click or drag an image to upload</p>
        </>
      )}
    </div>
  );
}
