import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServiceClient();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: images } = await supabase
    .from('project_images')
    .select('*')
    .order('sort_order', { ascending: true });

  const projectsWithImages = (projects || []).map((p) => ({
    ...p,
    images: (images || []).filter((img) => img.project_id === p.id),
  }));

  return NextResponse.json({ data: projectsWithImages });
}

export async function POST(request: Request) {
  const supabase = createServiceClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      id: body.id,
      title: body.title,
      category: body.category,
      location: body.location,
      year: body.year,
      description: body.description,
      order_index: body.order_index || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
