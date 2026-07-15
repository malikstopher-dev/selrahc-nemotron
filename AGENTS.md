# Selrahc Architects — Project Context

## Tech Stack
- **Framework:** Next.js 15.2.4 (App Router)
- **Language:** TypeScript 5.8.2
- **UI:** React 19, Tailwind CSS v4, Framer Motion, GSAP, Lenis
- **Backend:** Supabase (PostgreSQL + Storage + Auth)
- **Email:** Resend (contact form)
- **Deployment:** Vercel
- **Domain:** selrahcarchitects.com
- **GitHub:** malikstopher-dev/selrahc-nemotron

## Supabase
- Project URL: `https://epbuddarigztxqaqzihx.supabase.co`
- Credentials in `.env.local` (gitignored)
- Schema: `supabase/migrations/001_initial_schema.sql`
- Storage buckets: `project-images`, `media`

## CMS Admin
- Route: `/admin`
- Auth: Supabase Auth (email/password)
- Pages: Dashboard, Hero, About, Services, Process, Testimonials, FAQ, Contact, Projects, Media Library
- Seed button on dashboard imports existing hardcoded content into Supabase
- Admin login page has "Setup Admin Account" button to create/update the admin user
- ImagePicker component: upload, pick from library, reorder (arrows), delete
- All admin pages are `'use client'` and marked `dynamic = 'force-dynamic'` to avoid build prerender issues

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
- `src/middleware.ts` — protects /admin routes, redirects to /admin/login
- `src/i18n/LanguageProvider.tsx` — merges CMS content with static fallbacks from dictionary.ts
- `src/i18n/dictionary.ts` — EN + FR hardcoded fallback dictionaries
- `src/components/admin/ImagePicker.tsx` — reusable image upload/pick/reorder/delete
- `src/components/providers/SmoothScrollProvider.tsx` — Lenis + GSAP ScrollTrigger integration
- `src/components/animations/ScrollReveal.tsx` — GSAP scroll-triggered fade/slide reveals
- `src/components/animations/TextReveal.tsx` — staggered word-by-word text reveals
- `src/components/contact/ContactForm.tsx` — premium GSAP blueprint contact form
- `src/components/contact/BlueprintField.tsx` — self-drawing blueprint input field
- `src/components/contact/BlueprintTextarea.tsx` — self-drawing blueprint textarea
- `src/components/contact/BlueprintSelect.tsx` — self-drawing blueprint select
- `src/components/contact/BlueprintGrid.tsx` — self-drawing blueprint grid selector
- `src/components/layout/Header.tsx` — sticky header, hamburger menu
- `src/components/layout/Footer.tsx` — 4-column footer, credit line
- `src/app/layout.tsx` — root layout, metadata, JSON-LD structured data, smooth scroll wrapper

## Design Tokens
- `arch-black: #111111`, `arch-white: #F8F7F4`, `arch-bronze: #C8A97E`, `arch-gray: #6B7280`
- Fonts: Cormorant Garamond (headings), Inter (body)

## Hero Section Design Rule
- **Homepage only** — dark hero (`bg-arch-black`) with white navbar text (via `isHome && !scrolled` check)
- **All inner pages** — light hero (`bg-arch-white`) with black navbar text
- Header text color logic: `isHome && !scrolled` → white text; otherwise → black text
- CRITICAL: Never use `bg-arch-black` on inner page heroes — it makes the black navbar text invisible

## Header Nav Visibility
- `isHome = pathname === '/'`
- Homepage hero (before scroll): white nav links on dark bg
- All other pages or after scroll: black nav links on white/light bg
- Mobile hamburger: z-30 button, z-20 overlay, clean fade animation, `position: fixed` body scroll lock

## i18n
- Client-side only (localStorage key: `selrahc-locale`), EN + FR
- Dictionaries in `src/i18n/dictionary.ts` (~440 lines)
- CMS supports both locales via `site_content` table
- `mergeCmsContent()` merges CMS data into static fallback dictionaries

## API Routes
- `/api/auth/login` — Supabase email/password auth
- `/api/auth/logout` — sign out
- `/api/admin/content` — GET/PUT site_content per locale+section
- `/api/admin/projects` — GET/POST projects
- `/api/admin/projects/[id]` — GET/PUT/DELETE project
- `/api/admin/projects/images` — POST/PUT/DELETE project images
- `/api/admin/testimonials` — GET/POST/PUT testimonials
- `/api/admin/faq` — GET/POST/PUT FAQ items
- `/api/admin/upload` — image upload to storage
- `/api/admin/seed` — import existing hardcoded content + create admin user
- `/api/admin/setup` — create/update admin user
- `/api/admin/media` — GET/DELETE media items
- `/api/contact` — Resend email delivery

## Animation Stack
- **Lenis** — inertial smooth scrolling across the site
- **GSAP + ScrollTrigger** — scroll-driven text reveals and content animations
- **Framer Motion** — existing component-level animations (hero, menu, hover effects)
- **GSAP useGSAP** — used in blueprint contact form for self-drawing borders and label animations
- Reduced motion support via `matchMedia('(prefers-reduced-motion: reduce)')` checks

## Known TypeScript Issues & Fixes
- Framer Motion `ease` array needs `as const` assertion (e.g. `[0.25, 0.46, 0.45, 0.94] as const`)
- Supabase query `then()` returns `PromiseLike`, wrap in `Promise.resolve()` before `.catch()`
- Dictionary index access needs `Record<string, unknown>` type assertion in merge function
- Admin layout uses `export const dynamic = 'force-dynamic'` to prevent prerendering during build
- ESLint disabled during builds (`eslint: { ignoreDuringBuilds: true }`) because ESLint v9 lacks flat config
- Build takes ~5-8 minutes due to large project size

## Developer Attribution
- Footer: "Website by Stopher Malik & SMK Web Design" with links in green (`text-green-400`)
- Structured data: creator + copyrightHolder in JSON-LD
- Metadata: authors, creator fields
- HTML comment attribution near closing body tag

## Setup Checklist (for future reference)
1. Run SQL migration in Supabase SQL Editor
2. Set Vercel environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`
3. Go to `/admin/login`, enter credentials, click "Setup Admin Account"
4. Click "Import Existing Content" on the dashboard

## Next Recommended Enhancements
- Phase 2: Fluid page transitions between route changes
- Phase 3: Subtle React Three Fiber architectural background
