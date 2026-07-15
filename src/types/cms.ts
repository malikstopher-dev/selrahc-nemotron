export interface SiteContent {
  id: string;
  key: string;
  locale: 'en' | 'fr';
  section: string;
  value: unknown;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'renovations' | 'interior' | 'conceptual' | 'renderings';
  location: string;
  year: string;
  description: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  sort_order: number;
  created_at: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface Media {
  id: string;
  url: string;
  alt_text: string;
  file_name: string;
  file_size: number;
  uploaded_at: string;
}

export interface CmsContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImages: string[];
  };
  about: {
    title: string;
    subtitle: string;
    founderName: string;
    founderTitle: string;
    founderBio: string;
    mission: string;
    vision: string;
    values: Record<string, { title: string; desc: string }>;
    ourStory: string;
    founderHeading: string;
    valuesTitle: string;
    learnMore: string;
    cta: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
    specializations: {
      title: string;
      rendering: string;
      sketch: string;
      interior: string;
      visualization: string;
    };
    readyToStart: string;
    cta: string;
  };
  process: {
    title: string;
    subtitle: string;
    steps: { title: string; desc: string }[];
    beginJourney: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    cta: string;
  };
  faq: {
    title: string;
    subtitle: string;
    stillHaveQuestions: string;
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    phoneLabel: string;
    cta: string;
    form: Record<string, string>;
  };
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    contactInfo: string;
    rights: string;
    privacy: string;
    terms: string;
  };
  home: {
    selectedWorks: string;
    featuredProjects: string;
    featuredProjectsSub: string;
    viewAllProjects: string;
    aboutStudio: string;
    learnMore: string;
    whatWeDo: string;
    selectedWork: string;
    architecturalGallery: string;
    view: string;
    letsCreate: string;
    readyToBring: string;
  };
  meta: Record<string, string>;
  nav: Record<string, string>;
  whatsapp: { message: string };
  notFound: { title: string; message: string; cta: string };
  quote: {
    title: string;
    subtitle: string;
    form: Record<string, string>;
  };
}
