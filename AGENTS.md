# Selrahc Architects — Project Context

## Tech Stack
- **Framework:** Next.js 15.2.4 (App Router)
- **Language:** TypeScript 5.8.2
- **UI:** React 19, Tailwind CSS v4, Framer Motion
- **Backend:** Supabase (PostgreSQL + Storage + Auth)
- **Deployment:** Vercel
- **Domain:** selrahcarchitects.com

## Supabase
- Project URL: `https://epbuddarigztxqaqzihx.supabase.co`
- Credentials in `.env.local` (gitignored)
- Schema: `supabase/migrations/001_initial_schema.sql`

## CMS Admin
- Route: `/admin`
- Auth: Supabase Auth (email/password)
- Pages: Dashboard, Hero, About, Services, Process, Testimonials, FAQ, Contact, Projects, Media Library
- Seed button on dashboard imports existing hardcoded content into Supabase

## Database Tables
- `site_content` — key-value text content per locale (en/fr)
- `projects` — portfolio projects
- `project_images` — images per project (ordered)
- `testimonials` — client testimonials
- `faq_items` — FAQ entries
- `media` — uploaded images

## Key Files
- `src/lib/supabase/client.ts` — browser client
- `src/lib/supabase/server.ts` — server client (cookies)
- `src/lib/supabase/service.ts` — service role client (admin API routes)
- `src/middleware.ts` — protects /admin routes
- `src/i18n/LanguageProvider.tsx` — merges CMS content with static fallbacks
- `src/components/admin/ImagePicker.tsx` — reusable image upload/pick/reorder/delete

## Design Tokens
- `arch-black: #111111`, `arch-white: #F8F7F4`, `arch-bronze: #C8A97E`, `arch-gray: #6B7280`
- Fonts: Cormorant Garamond (headings), Inter (body)

## Public Pages
- Content auto-merges: CMS data overrides static hardcoded fallbacks
- Pages: Home, About, Services, Portfolio, Process, Testimonials, FAQ, Contact, Quote, 404

## i18n
- Client-side only (localStorage), EN + FR
- Dictionaries in `src/i18n/dictionary.ts`
- CMS supports both locales

## Notes
- Portfolio uses dynamic `[id]` routes
- Contact form uses Resend for email delivery
- All admin pages are `'use client'`
- Image uploads go to Supabase Storage buckets: `project-images`, `media`
