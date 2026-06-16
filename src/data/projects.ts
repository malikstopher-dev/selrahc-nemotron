export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'renovations' | 'interior' | 'conceptual' | 'renderings';
  location: string;
  year: string;
  description: string;
  images: string[];
}

const img = (num: string) => `/images/img-${num}.jpg`;

export const projects: Project[] = [
  {
    id: 'contemporary-residence-01',
    title: 'Contemporary Hillside Residence',
    category: 'residential',
    location: 'Johannesburg',
    year: '2025',
    description: 'A striking contemporary residence designed to embrace panoramic views through floor-to-ceiling glazing and open-plan living spaces.',
    images: [img('47-48'), img('47-48-1'), img('47-49'), img('47-49-1')],
  },
  {
    id: 'luxury-renovation-01',
    title: 'Heritage Home Restoration',
    category: 'renovations',
    location: 'Kensington',
    year: '2025',
    description: 'A sensitive restoration and modern extension of a heritage property, blending period charm with contemporary living.',
    images: [img('47-50'), img('47-50-1'), img('47-51')],
  },
  {
    id: 'modern-villa-01',
    title: 'Modern Villa Design',
    category: 'residential',
    location: 'Sandton',
    year: '2024',
    description: 'An ultra-modern villa with clean geometric lines, integrated landscaping, and seamless indoor-outdoor flow.',
    images: [img('47-53'), img('47-53-1'), img('47-53-2'), img('47-54')],
  },
  {
    id: 'interior-loft-01',
    title: 'Penthouse Interior',
    category: 'interior',
    location: 'Johannesburg',
    year: '2024',
    description: 'Luxurious penthouse interior design featuring curated materials, bespoke joinery, and refined spatial planning.',
    images: [img('47-54-1'), img('47-55'), img('47-55-1'), img('47-55-2')],
  },
  {
    id: 'conceptual-tower-01',
    title: 'Mixed-Use Tower Concept',
    category: 'conceptual',
    location: 'Cape Town',
    year: '2024',
    description: 'A conceptual mixed-use tower exploring vertical urbanism and sustainable high-density living.',
    images: [img('47-56'), img('47-56-1'), img('47-57'), img('47-57-1')],
  },
  {
    id: 'rendering-collection-01',
    title: 'Photorealistic Render Collection',
    category: 'renderings',
    location: 'Various',
    year: '2025',
    description: 'A collection of photorealistic architectural renderings showcasing materiality, lighting, and spatial quality.',
    images: [img('47-58'), img('47-58-1'), img('47-59'), img('47-40')],
  },
  {
    id: 'residential-estate-01',
    title: 'Luxury Estate Design',
    category: 'residential',
    location: 'Pretoria',
    year: '2024',
    description: 'An expansive luxury estate designed with classical proportions and modern amenities.',
    images: [img('48-14'), img('48-14-1'), img('48-00-2'), img('48-01')],
  },
  {
    id: 'interior-residence-02',
    title: 'Minimalist Residence Interior',
    category: 'interior',
    location: 'Johannesburg',
    year: '2024',
    description: 'A minimalist interior design project focusing on clean lines, natural light, and carefully selected materials.',
    images: [img('48-02'), img('48-03'), img('48-04'), img('48-05')],
  },
  {
    id: 'renovation-victorian-01',
    title: 'Victorian Terrace Renovation',
    category: 'renovations',
    location: 'Kensington',
    year: '2025',
    description: 'Complete renovation of a Victorian terrace home, adding a contemporary rear extension while preserving original features.',
    images: [img('48-05-1'), img('48-06'), img('48-06-1'), img('48-07')],
  },
  {
    id: 'residential-coastal-01',
    title: 'Coastal Retreat',
    category: 'residential',
    location: 'Durban',
    year: '2025',
    description: 'A coastal residence designed to capture ocean breezes and frame seascape views through expansive glazing.',
    images: [img('48-07-1'), img('48-08'), img('48-08-1'), img('48-09')],
  },
  {
    id: 'rendering-sketch-01',
    title: 'Architectural Sketch Renderings',
    category: 'renderings',
    location: 'Various',
    year: '2025',
    description: 'Artistic sketch renderings capturing the essence and atmosphere of architectural concepts.',
    images: [img('48-09-1'), img('48-10'), img('48-10-1'), img('48-11')],
  },
  {
    id: 'conceptual-pavilion-01',
    title: 'Garden Pavilion Concept',
    category: 'conceptual',
    location: 'Johannesburg',
    year: '2024',
    description: 'A conceptual garden pavilion exploring transparent boundaries between interior and landscape.',
    images: [img('48-12'), img('48-12-1'), img('48-13'), img('48-13-1')],
  },
];

export const categories = [
  { id: 'all', label: { en: 'All Projects', fr: 'Tous les Projets' } },
  { id: 'residential', label: { en: 'Residential', fr: 'Résidentiel' } },
  { id: 'renovations', label: { en: 'Renovations', fr: 'Rénovations' } },
  { id: 'interior', label: { en: 'Interior Design', fr: 'Design d\'Intérieur' } },
  { id: 'conceptual', label: { en: 'Conceptual', fr: 'Conceptuel' } },
  { id: 'renderings', label: { en: 'Renderings', fr: 'Rendus' } },
];

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export const heroImages = [
  img('47-48'),
  img('47-53'),
  img('48-14'),
  img('47-55'),
  img('47-35'),
  img('47-37'),
  img('47-39'),
  img('47-41'),
  img('47-43'),
  img('47-45'),
  img('47-47'),
  img('48-15'),
];

export const allImages = [
  ...projects.map(p => p.images[0]),
  img('47-36'), img('47-36-1'), img('47-38'), img('47-39-1'),
  img('47-40-1'), img('47-40-2'), img('47-42'), img('47-43-1'),
  img('47-44'), img('47-44-1'), img('47-45-1'), img('47-46'),
  img('47-46-1'), img('47-47-1'), img('48-15-1'), img('48-16'),
  img('48-16-1'), img('58-40'), '/images/bg1.jpg',
];
