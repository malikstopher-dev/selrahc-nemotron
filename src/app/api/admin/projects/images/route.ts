import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('project_images')
    .insert({
      project_id: body.project_id,
      image_url: body.image_url,
      alt_text: body.alt_text || '',
      sort_order: body.sort_order || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();

  const { error } = await supabase
    .from('project_images')
    .update({ sort_order: body.sort_order })
    .eq('project_id', body.project_id)
    .eq('image_url', body.image_url);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = createServiceClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const projectId = searchParams.get('project_id');
  const imageUrl = searchParams.get('image_url');

  if (id) {
    const { error } = await supabase.from('project_images').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (projectId && imageUrl) {
    const { error } = await supabase.from('project_images').delete().eq('project_id', projectId).eq('image_url', imageUrl);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ error: 'Missing id or project_id+image_url' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
