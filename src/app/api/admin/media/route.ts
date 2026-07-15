import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from('media').select('*').order('uploaded_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const supabase = createServiceClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { data: item } = await supabase.from('media').select('url').eq('id', id).single();
  if (item) {
    const path = item.url.split('/').pop();
    if (path) {
      await supabase.storage.from('media').remove([path]);
    }
  }

  const { error } = await supabase.from('media').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
