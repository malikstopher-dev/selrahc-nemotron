import { createServiceClient } from '@/lib/supabase/service';
import { dictionaries } from '@/i18n/dictionary';
import { projects, heroImages } from '@/data/projects';

export async function seedCmsContent() {
  const supabase = createServiceClient();

  // Seed site content for both locales
  for (const [locale, dict] of Object.entries(dictionaries)) {
    const sections: Record<string, unknown> = {
      hero: { ...dict.hero, heroImages },
      about: dict.about,
      services: dict.services,
      process: dict.process,
      testimonials: { title: dict.testimonials.title, subtitle: dict.testimonials.subtitle, cta: dict.testimonials.cta },
      faq: { title: dict.faq.title, subtitle: dict.faq.subtitle, stillHaveQuestions: dict.faq.stillHaveQuestions },
      contact: dict.contact,
      footer: dict.footer,
      home: dict.home,
      meta: dict.meta,
      nav: dict.nav,
      whatsapp: dict.whatsapp,
      notFound: dict.notFound,
      quote: dict.quote,
    };

    for (const [key, value] of Object.entries(sections)) {
      await supabase
        .from('site_content')
        .upsert({ key, locale, section: key, value, updated_at: new Date().toISOString() }, { onConflict: 'key,locale' });
    }
  }

  // Seed projects
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await supabase
      .from('projects')
      .upsert({
        id: p.id,
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        description: p.description,
        order_index: i,
      }, { onConflict: 'id' });

    // Seed project images
    for (let j = 0; j < p.images.length; j++) {
      const imageUrl = p.images[j];
      const existing = await supabase.from('project_images').select('id').eq('project_id', p.id).eq('image_url', imageUrl).single();
      if (!existing.data) {
        await supabase.from('project_images').insert({
          project_id: p.id,
          image_url: imageUrl,
          alt_text: p.title,
          sort_order: j,
        });
      }
    }
  }

  // Seed testimonials
  for (const [i, t] of dictionaries.en.testimonials.items.entries()) {
    const existing = await supabase.from('testimonials').select('id').eq('name', t.name).single();
    if (!existing.data) {
      await supabase.from('testimonials').insert({
        name: t.name,
        location: t.location,
        text: t.text,
        sort_order: i,
      });
    }
  }

  // Seed FAQ
  for (const [i, f] of dictionaries.en.faq.items.entries()) {
    const existing = await supabase.from('faq_items').select('id').eq('question', f.q).single();
    if (!existing.data) {
      await supabase.from('faq_items').insert({
        question: f.q,
        answer: f.a,
        sort_order: i,
      });
    }
  }

  return { success: true };
}
