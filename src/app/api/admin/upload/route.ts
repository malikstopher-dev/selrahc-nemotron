import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const bucket = (formData.get('bucket') as string) || 'media';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { contentType: file.type });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

  const { data: mediaData, error: mediaError } = await supabase
    .from('media')
    .insert({
      url: urlData.publicUrl,
      alt_text: file.name.replace(/\.[^.]+$/, ''),
      file_name: file.name,
      file_size: file.size,
    })
    .select()
    .single();

  if (mediaError) return NextResponse.json({ error: mediaError.message }, { status: 500 });

  return NextResponse.json({ data: mediaData });
}
