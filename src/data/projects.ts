export type ProjectCategory = 'residential' | 'interior' | 'commercial' | 'renovation'

export interface Project {
  id: string
  slug: string
  title: string
  titleFr: string
  location: string
  locationFr: string
  year: string
  category: ProjectCategory
  description: string
  descriptionFr: string
  heroImage: string
  images: string[]
  featured: boolean
  area?: string
}

const img = (n: number) => `/images/image-${String(n).padStart(2, '0')}.jpg`

function range(start: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => img(start + i))
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'sandton-residence',
    title: 'Sandton Residence',
    titleFr: 'Résidence Sandton',
    location: 'Sandton, Johannesburg',
    locationFr: 'Sandton, Johannesburg',
    year: '2025',
    category: 'residential',
    description: 'A contemporary masterpiece defined by clean lines, expansive glazing, and a seamless indoor-outdoor connection. The design responds to its suburban context with a bold cantilevered form that floats above the landscaped garden.',
    descriptionFr: "Un chef-d'œuvre contemporain défini par des lignes épurées, un vitrage expansif et une connexion intérieur-extérieur harmonieuse. Le design répond à son contexte suburbain avec une forme en porte-à-faux audacieuse.",
    heroImage: img(1),
    images: range(1, 7),
    featured: true,
    area: '850 m²',
  },
  {
    id: '2',
    slug: 'clifton-villa',
    title: 'Clifton Villa',
    titleFr: 'Villa Clifton',
    location: 'Clifton, Cape Town',
    locationFr: 'Clifton, Le Cap',
    year: '2024',
    category: 'residential',
    description: 'Perched on the Atlantic seaboard, this villa embraces its dramatic coastal setting. Floor-to-ceiling glass frames panoramic ocean views while local stone anchors the structure to its site.',
    descriptionFr: "Perchée sur le littoral atlantique, cette villa embrasse son cadre côtier spectaculaire. Des vitrages du sol au plafond encadrent des vues panoramiques sur l'océan.",
    heroImage: img(8),
    images: range(8, 7),
    featured: true,
    area: '720 m²',
  },
  {
    id: '3',
    slug: 'penthouse-interior',
    title: 'Penthouse Interior',
    titleFr: 'Intérieur de Penthouse',
    location: 'Umhlanga, Durban',
    locationFr: 'Umhlanga, Durban',
    year: '2025',
    category: 'interior',
    description: 'An exploration of refined minimalism where every detail is carefully considered. Custom joinery, sculptural lighting, and a restrained material palette create a serene urban sanctuary.',
    descriptionFr: "Une exploration du minimalisme raffiné où chaque détail est soigneusement étudié. Menuiserie sur mesure, éclairage sculptural et palette de matériaux retenue.",
    heroImage: img(15),
    images: range(15, 7),
    featured: true,
    area: '340 m²',
  },
  {
    id: '4',
    slug: 'fourways-estate',
    title: 'Fourways Estate',
    titleFr: 'Domaine Fourways',
    location: 'Fourways, Johannesburg',
    locationFr: 'Fourways, Johannesburg',
    year: '2024',
    category: 'residential',
    description: 'A private estate where modernist principles meet warm African sensibilities. The home unfolds as a series of pavilions around a central courtyard, blurring boundaries between inside and out.',
    descriptionFr: "Un domaine privé où les principes modernistes rencontrent les sensibilités africaines chaleureuses. La maison se déploie en une série de pavillons autour d'une cour centrale.",
    heroImage: img(22),
    images: range(22, 7),
    featured: true,
    area: '1200 m²',
  },
  {
    id: '5',
    slug: 'waterfall-office',
    title: 'Waterfall Office Park',
    titleFr: 'Parc de Bureaux Waterfall',
    location: 'Waterfall, Midrand',
    locationFr: 'Waterfall, Midrand',
    year: '2023',
    category: 'commercial',
    description: 'A workplace designed for the future of work. Flexible floor plates, abundant natural light, and integrated green spaces foster collaboration and wellbeing.',
    descriptionFr: "Un espace de travail conçu pour l'avenir du travail. Plateaux flexibles, lumière naturelle abondante et espaces verts intégrés favorisent la collaboration.",
    heroImage: img(29),
    images: range(29, 7),
    featured: true,
    area: '4500 m²',
  },
  {
    id: '6',
    slug: 'parkview-renovation',
    title: 'Parkview Residence Renovation',
    titleFr: 'Rénovation Résidence Parkview',
    location: 'Parkview, Johannesburg',
    locationFr: 'Parkview, Johannesburg',
    year: '2024',
    category: 'renovation',
    description: 'A sensitive renovation of a mid-century home, reimagined for contemporary living while respecting its architectural heritage. Original features are celebrated alongside modern interventions.',
    descriptionFr: "Une rénovation sensible d'une maison du milieu du siècle, réimaginée pour la vie contemporaine tout en respectant son patrimoine architectural.",
    heroImage: img(36),
    images: range(36, 7),
    featured: true,
    area: '450 m²',
  },
  {
    id: '7',
    slug: 'bryanston-residence',
    title: 'Bryanston Residence',
    titleFr: 'Résidence Bryanston',
    location: 'Bryanston, Johannesburg',
    locationFr: 'Bryanston, Johannesburg',
    year: '2025',
    category: 'residential',
    description: 'A sculptural family home that balances privacy with transparency. The façade is a study in layered volumes, with deep recesses and projecting planes creating ever-changing shadow patterns.',
    descriptionFr: "Une maison familiale sculpturale qui équilibre intimité et transparence. La façade est une étude de volumes superposés.",
    heroImage: img(43),
    images: range(43, 7),
    featured: false,
    area: '680 m²',
  },
  {
    id: '8',
    slug: 'constantia-wine-estate',
    title: 'Constantia Wine Estate',
    titleFr: 'Domaine Viticole Constantia',
    location: 'Constantia, Cape Town',
    locationFr: 'Constantia, Le Cap',
    year: '2023',
    category: 'commercial',
    description: 'A hospitality and tasting pavilion nestled among ancient vines. The architecture defers to the landscape, with rammed earth walls and timber roofs that reference the agrarian context.',
    descriptionFr: "Un pavillon d'accueil et de dégustation niché parmi des vignes anciennes. L'architecture s'efface devant le paysage.",
    heroImage: img(50),
    images: range(50, 7),
    featured: false,
    area: '1200 m²',
  },
  {
    id: '9',
    slug: 'rosebank-apartment',
    title: 'Rosebank Luxury Apartment',
    titleFr: 'Appartement de Luxe Rosebank',
    location: 'Rosebank, Johannesburg',
    locationFr: 'Rosebank, Johannesburg',
    year: '2025',
    category: 'interior',
    description: 'An urban pied-à-terre designed for the discerning global citizen. Rich materials, custom furniture, and art-integrated spaces create a deeply personal environment.',
    descriptionFr: "Un pied-à-terre urbain conçu pour le citoyen mondial exigeant. Matériaux riches, mobilier sur mesure.",
    heroImage: img(57),
    images: range(57, 6),
    featured: false,
    area: '180 m²',
  },
  {
    id: '10',
    slug: 'lanseria-country-estate',
    title: 'Lanseria Country Estate',
    titleFr: 'Domaine Campagnard Lanseria',
    location: 'Lanseria, Gauteng',
    locationFr: 'Lanseria, Gauteng',
    year: '2024',
    category: 'residential',
    description: 'A weekend retreat that embraces raw materiality and honest construction. Exposed concrete, steel, and glass create a refined industrial aesthetic set within the bushveld.',
    descriptionFr: "Une retraite de semaine qui embrasse la matérialité brute et la construction honnête. Béton apparent, acier et verre.",
    heroImage: img(63),
    images: range(63, 6),
    featured: false,
    area: '550 m²',
  },
  {
    id: '11',
    slug: 'melrose-arch-office',
    title: 'Melrose Arch Office',
    titleFr: 'Bureau Melrose Arch',
    location: 'Melrose Arch, Johannesburg',
    locationFr: 'Melrose Arch, Johannesburg',
    year: '2024',
    category: 'commercial',
    description: 'A boutique office fit-out that redefines the workplace experience. Biophilic design principles, acoustic sophistication, and flexible zones accommodate diverse work styles.',
    descriptionFr: "Un aménagement de bureau boutique qui redéfinit l'expérience de travail. Principes de design biophilique.",
    heroImage: img(69),
    images: range(69, 6),
    featured: false,
    area: '600 m²',
  },
  {
    id: '12',
    slug: 'hyde-park-heritage',
    title: 'Hyde Park Heritage Home',
    titleFr: 'Maison Patrimoniale Hyde Park',
    location: 'Hyde Park, Johannesburg',
    locationFr: 'Hyde Park, Johannesburg',
    year: '2025',
    category: 'renovation',
    description: 'A meticulous restoration and contemporary addition to a heritage-listed property. Original period details are preserved while new volumes introduce a light-filled modern wing.',
    descriptionFr: "Une restauration minutieuse et un ajout contemporain à une propriété classée. Les détails d'époque sont préservés.",
    heroImage: img(75),
    images: range(75, 3),
    featured: false,
    area: '500 m²',
  },
]

export const featuredProjects = projects.filter(p => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex(p => p.slug === slug)
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

export const categories: { key: ProjectCategory | 'all'; label: string; labelFr: string }[] = [
  { key: 'all', label: 'All Projects', labelFr: 'Tous les Projets' },
  { key: 'residential', label: 'Residential', labelFr: 'Résidentiel' },
  { key: 'interior', label: 'Interior Design', labelFr: "Architecture d'Intérieur" },
  { key: 'commercial', label: 'Commercial', labelFr: 'Commercial' },
  { key: 'renovation', label: 'Renovations', labelFr: 'Rénovations' },
]
