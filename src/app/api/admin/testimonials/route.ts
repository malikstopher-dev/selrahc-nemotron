import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from('testimonials').select('*').order('sort_order', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('testimonials')
    .insert({ name: body.name, location: body.location, text: body.text, sort_order: body.sort_order || 0 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const supabase = createServiceClient();
  const { items } = await request.json();

  for (const item of items) {
    await supabase
      .from('testimonials')
      .upsert({ id: item.id, name: item.name, location: item.location, text: item.text, sort_order: item.sort_order }, { onConflict: 'id' });
  }

  return NextResponse.json({ success: true });
}
