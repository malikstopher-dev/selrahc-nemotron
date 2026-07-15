import { createServiceClient } from '@/lib/supabase/service';
import { dictionaries, type Dictionary } from '@/i18n/dictionary';
import { projects as staticProjects, heroImages as staticHeroImages, allImages as staticAllImages } from '@/data/projects';

export async function getCmsContent(locale: string = 'en') {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('locale', locale);

    if (!data || data.length === 0) {
      return null;
    }

    const content: Record<string, unknown> = {};
    for (const item of data) {
      content[item.key] = item.value;
    }
    return content;
  } catch {
    return null;
  }
}

export async function getCmsProjects() {
  try {
    const supabase = createServiceClient();
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (!projects || projects.length === 0) {
      return null;
    }

    const { data: images } = await supabase
      .from('project_images')
      .select('*')
      .order('sort_order', { ascending: true });

    return projects.map(p => ({
      ...p,
      images: (images || []).filter(i => i.project_id === p.id).map(i => i.image_url),
    }));
  } catch {
    return null;
  }
}

export async function getCmsTestimonials() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    return data && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export async function getCmsFaq() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from('faq_items').select('*').order('sort_order');
    return data && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export async function getCmsHeroImages() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from('media').select('url').order('uploaded_at', { ascending: false }).limit(12);
    return data && data.length > 0 ? data.map(d => d.url) : null;
  } catch {
    return null;
  }
}

export function getFallbackDictionary(locale: string): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

export { staticProjects, staticHeroImages, staticAllImages };
