# Selrahc Architects — Project Context

## Tech Stack
- **Framework:** Next.js 15.5.19 (App Router)
- **Language:** TypeScript 5.8.2
- **UI:** React 19, Tailwind CSS v4, Framer Motion, GSAP, Lenis
- **Backend:** Supabase (PostgreSQL + Storage + Auth) — `@supabase/ssr` v0.12.3
- **Email:** Resend (contact form)
- **Deployment:** Vercel
- **Domain:** selrahcarchitects.com (www)
- **GitHub:** malikstopher-dev/selrahc-nemotron

## Supabase
- Project URL: `https://epbuddarigztxqaqzihx.supabase.co`
- Credentials in `.env.local` (gitignored) + Vercel env vars
- Schema: `supabase/migrations/001_initial_schema.sql`
- Storage buckets: `project-images`, `media`
- **CRITICAL:** `@supabase/ssr` v0.12.3 requires `getAll`/`setAll` pattern — the old `get`/`set`/`remove` pattern is deprecated and silently fails

## CMS Admin
- Route: `/admin`
- Login: `selrahcarchitects.com/admin/login`
- Auth: Supabase Auth (email/password)
- **Admin credentials:** `info@stopher-malik.co.za` / `Lovers0884?`
- Pages: Dashboard, Hero, About, Services, Process, Testimonials, FAQ, Contact, Projects, Media Library
- Seed button on dashboard imports existing hardcoded content into Supabase
- Admin login page has "Setup Admin Account" button to create/update the admin user
- ImagePicker component: upload, pick from library, reorder (arrows), delete
- All admin pages are `'use client'` and marked `dynamic = 'force-dynamic'` to avoid build prerender issues
- Accessible from any device/browser — no local install needed

## Database Tables
- `site_content` — key-value text content per locale (en/fr)
- `projects` — portfolio projects
- `project_images` — images per project (ordered)
- `testimonials` — client testimonials
- `faq_items` — FAQ entries
- `media` — uploaded images

## Key Files
- `src/lib/supabase/client.ts` — browser client (createBrowserClient)
- `src/lib/supabase/server.ts` — server client (getAll/setAll with cookieStore)
- `src/lib/supabase/service.ts` — service role client (admin API routes)
- `src/middleware.ts` — protects /admin routes, uses getAll/setAll pattern
- `src/i18n/LanguageProvider.tsx` — merges CMS content with static fallbacks; **skips 'hero' key** so dictionary is source of truth for hero text
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
- `src/components/layout/Header.tsx` — slim glass nav, logo + company name, transparent on homepage
- `src/components/layout/Footer.tsx` — 4-column footer, credit line, larger logo on desktop
- `src/app/layout.tsx` — root layout, metadata, JSON-LD structured data, smooth scroll wrapper
- `src/lib/seed.ts` — seeds CMS; hero section only stores `{ heroImages }` (not text)

## Design Tokens
- `arch-black: #111111`, `arch-white: #F8F7F4`, `arch-bronze: #C8A97E`, `arch-gray: #6B7280`
- Fonts: Cormorant Garamond (headings), Inter (body)

## Hero Section Design
- **Homepage only** — dark hero (`bg-arch-black`) with white navbar text (via `isHome && !scrolled` check)
- **All inner pages** — light hero (`bg-arch-white`) with black navbar text
- Hero text is **dictionary-controlled** (developer edits `dictionary.ts`), NOT CMS-controlled
- LanguageProvider skips `hero` key in CMS merge to prevent old CMS data overriding dictionary
- CMS only stores `heroImages` array for the slideshow
- Content is vertically centered (`justify-center`) with `pb-24 md:pb-28`
- Label: "Award-Winning Architectural Studio" with bronze hairline divider
- Headline: `text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl` (reduced from 5.5rem to prevent overflow)
- Subheadline: max-w-[520px], text-base to lg:text-[1.125rem]
- Primary CTA: solid white pill, bronze on hover
- Secondary CTA: glass border with backdrop-blur
- Parallax: background translates at 0.4× scroll rate
- Slideshow: 7s interval, progress bar at bottom, counter "01 / 12"
- Staggered reveal: label (0.4s) → headline (0.6s) → copy (1s) → CTAs (1.25s)

## Header Design
- Slim height: `h-14 md:h-[72px]`
- Glass morphism at top of homepage (`backdrop-blur` + dark gradient)
- When scrolled: `bg-white/90 backdrop-blur-xl` with hairline bottom border
- Logo: `h-7 md:h-[34px]` (15% bigger than original)
- Company name: "Selrahc Architects" displayed next to logo (uppercase, `text-[10px] sm:text-[11px]`)
- Nav links: 11px, 65% opacity, bronze underline on hover/active
- CTA button: solid white on dark hero, solid black on light pages, bronze on hover
- Language switcher: 10px at 35% opacity (subtle)
- Mobile hamburger: z-30, thin 1.5px lines, body scroll lock

## Footer Design
- Logo: `h-6 md:h-[42px]` (30% bigger on desktop)
- 4-column grid: logo/description, quick links, services, contact info
- Developer credit: "Website by Stopher Malik & SMK Web Design" in green

## i18n
- Client-side only (localStorage key: `selrahc-locale`), EN + FR
- Dictionaries in `src/i18n/dictionary.ts` (~440 lines)
- CMS supports both locales via `site_content` table
- `mergeCmsContent()` merges CMS data into static fallback dictionaries, **skips 'hero' key**

## API Routes
- `/api/auth/login` — Supabase email/password auth (uses parseCookieHeader/serializeCookieHeader)
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
- **Framer Motion** — component-level animations (hero slideshow, menu, hover effects)
- **GSAP useGSAP** — used in blueprint contact form for self-drawing borders and label animations
- Reduced motion support via `matchMedia('(prefers-reduced-motion: reduce)')` checks

## Known TypeScript Issues & Fixes
- Framer Motion `ease` array needs `as const` assertion (e.g. `[0.25, 0.46, 0.45, 0.94] as const`)
- `@supabase/ssr` v0.12.3: use `cookies.set({ name, value, ...options })` object syntax (not `cookies.set(name, value, options)`) — the `Parameters` cast resolves to the wrong overload
- `parseCookieHeader` from `@supabase/ssr` returns `{ name, value }[]` — use for `getAll`
- `setAll` receives `(cookiesToSet, headers)` — headers are cache-control headers that must be set on the response
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
5. After hero redesign: click "Import Existing Content" again to clear old CMS hero data

## Known Gotchas
- Old CMS `site_content` hero entries override dictionary text — LanguageProvider now skips 'hero' key
- `signInWithPassword` cookie fix: login route must create its own Supabase client that writes cookies to response via `setAll`, not the shared server client
- Vercel builds fail if `cookies.set()` uses wrong TypeScript overload — use object syntax `{ name, value, ...options }`

## Next Recommended Enhancements
- Phase 2: Fluid page transitions between route changes
- Phase 3: Subtle React Three Fiber architectural background
