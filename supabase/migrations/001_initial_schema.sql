-- Selrahc Architects CMS Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site content (key-value store for all text content, per locale)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'fr')),
  section TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(key, locale)
);

-- 2. Projects
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('residential', 'renovations', 'interior', 'conceptual', 'renderings')),
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Project images
CREATE TABLE IF NOT EXISTS project_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FAQ items
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Media library
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  file_name TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_site_content_locale ON site_content(locale);
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_project_images_project ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_faq_items_order ON faq_items(sort_order);

-- Row Level Security (RLS)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read content)
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read project_images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read faq_items" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);

-- Admin write policies (service role can do everything)
CREATE POLICY "Admin all site_content" ON site_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin all project_images" ON project_images FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin all faq_items" ON faq_items FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin all media" ON media FOR ALL USING (auth.role() = 'service_role');

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read project-images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Admin insert project-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'service_role');
CREATE POLICY "Admin delete project-images" ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND auth.role() = 'service_role');

CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admin insert media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'service_role');
CREATE POLICY "Admin delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'service_role');
