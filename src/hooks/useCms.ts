'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type SiteContentRow = Database['public']['Tables']['site_content']['Row'];
type ProjectRow = Database['public']['Tables']['projects']['Row'] & { project_images?: { image_url: string }[] };
type TestimonialRow = Database['public']['Tables']['testimonials']['Row'];
type FaqItemRow = Database['public']['Tables']['faq_items']['Row'];

export function useCmsContent(locale: string = 'en', section?: string) {
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchContent() {
      let query = supabase.from('site_content').select('*').eq('locale', locale);
      if (section) query = query.eq('section', section);

      const { data } = await query;
      if (data) {
        const map: Record<string, unknown> = {};
        for (const item of data) {
          map[item.key] = item.value;
        }
        setContent(map);
      }
      setLoading(false);
    }

    fetchContent();
  }, [locale, section]);

  return { content, loading };
}

export function useCmsProjects() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*, project_images(image_url)')
        .order('order_index');

      if (data) setProjects(data);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return { projects, loading };
}
