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
    description: 'Perched on a steep Johannesburg ridge, this site demanded a response that could capture 270-degree city views while negotiating challenging topography. Our solution was a split-volume plan that steps down with the slope, anchoring the building into the hillside rather than fighting it. Floor-to-ceiling glazing dissolves the boundary between interior and panorama, while deep overhangs provide solar control. The open-plan living core is flanked by a sculptural stair that doubles as a light shaft, drawing natural illumination deep into the plan. The result is a residence that feels weightless — as much a viewing platform as a home — where every room connects to landscape and sky.',
    images: [img('47-48'), img('47-48-1'), img('47-49'), img('47-49-1')],
  },
  {
    id: 'luxury-renovation-01',
    title: 'Heritage Home Restoration',
    category: 'renovations',
    location: 'Kensington',
    year: '2025',
    description: 'Victorian-era homes in Kensington present a delicate challenge: how to introduce contemporary spatial generosity without erasing the character that makes them valuable. Our approach treated the original fabric as a resource rather than an obstacle. We restored period ceilings, fireplaces, and timber joinery to their original condition, then inserted a carefully scaled rear extension defined by a folded steel roof and full-height glazing. The new wing houses an open kitchen and living area that opens onto a landscaped courtyard, creating 80 square metres of additional usable space. By respecting what existed and adding only what was necessary, the home gained contemporary function while retaining its heritage soul — a balance that increases both liveability and long-term value.',
    images: [img('47-50'), img('47-50-1'), img('47-51')],
  },
  {
    id: 'modern-villa-01',
    title: 'Modern Villa Design',
    category: 'residential',
    location: 'Sandton',
    year: '2024',
    description: 'The brief called for a family home that balanced privacy with entertainment, openness with intimacy. Located on a generous Sandton plot, we organised the plan around a central courtyard — a protected outdoor room that serves as the home\'s organising device. Clean geometric forms in pigmented plaster and natural stone anchor the architecture, while oversized sliding walls allow the entire ground floor to open to the garden. A cantilevered first-floor volume shades the terrace below and frames views of the established treeline. The material palette is deliberately restrained: warm limestone, dark steel, and timber ceilings create a backdrop for life rather than a statement. The villa achieves something rare — a contemporary home that feels both ambitious and calm, generous in experience while precise in its use of space.',
    images: [img('47-53'), img('47-53-1'), img('47-53-2'), img('47-54')],
  },
  {
    id: 'interior-loft-01',
    title: 'Penthouse Interior',
    category: 'interior',
    location: 'Johannesburg',
    year: '2024',
    description: 'A top-floor penthouse in a Johannesburg high-rise presented the opposite of the usual constraint — unlimited space but no sense of human scale. The challenge was to transform an open 250-square-metre floor plate into a series of distinct, intimate environments without closing off the city views. Our interior architecture strategy used freestanding joinery volumes — a marble-clad kitchen island, a timber library wall, a bronze-framed sleeping core — to define zones within the open plan. Materials were selected for tactile quality: hand-trowelled plaster, oiled oak, honed marble, and brushed brass. The palette shifts in tone from public to private zones, guiding movement through the apartment. The result is a penthouse that feels curated rather than decorated — every surface, every junction considered as part of a singular spatial composition.',
    images: [img('47-54-1'), img('47-55'), img('47-55-1'), img('47-55-2')],
  },
  {
    id: 'conceptual-tower-01',
    title: 'Mixed-Use Tower Concept',
    category: 'conceptual',
    location: 'Cape Town',
    year: '2024',
    description: 'This conceptual tower for the Cape Town foreshore reimagines the mixed-use typology as a vertical neighbourhood rather than a stacked programme. The challenge: how to create community and spatial variety within a 40-storey volume without excessive structural complexity. Our solution proposes a diagrid exoskeleton that frees the interior from load-bearing walls, allowing residential, office, and hospitality uses to occupy differently configured floor plates within a single tectonic language. Sky gardens at 10-storey intervals provide shared amenity space and natural ventilation shafts. The façade responds to solar orientation with a variable-depth brise-soleil that reduces cooling load by an estimated 35 percent. The tower is conceived not as a singular object but as a piece of urban infrastructure — dense, efficient, and generous in its contribution to the public realm.',
    images: [img('47-56'), img('47-56-1'), img('47-57'), img('47-57-1')],
  },
  {
    id: 'rendering-collection-01',
    title: 'Photorealistic Render Collection',
    category: 'renderings',
    location: 'Various',
    year: '2025',
    description: 'Architectural visualisation is a design tool, not just a presentation exercise. This collection of photorealistic renderings was produced across multiple client projects to test material assemblies, light conditions, and spatial sequences before construction. Each rendering is built from the same BIM model used for documentation, ensuring consistency between visualisation and built reality. We use physically based rendering workflows calibrated to Johannesburg\'s specific light latitude and seasonal sun angles, so the imagery predicts real-world performance — not an idealised version of it. The collection spans exterior studies at varying times of day, interior daylight analysis, material comparison studies, and contextual streetscape views. For clients, these renderings provide confidence; for us, they are a critical design tool to resolve spatial and material decisions early, when changes are cheapest and most impactful.',
    images: [img('47-58'), img('47-58-1'), img('47-59'), img('47-40')],
  },
  {
    id: 'residential-estate-01',
    title: 'Luxury Estate Design',
    category: 'residential',
    location: 'Pretoria',
    year: '2024',
    description: 'A 1.5-hectare property in Pretoria\'s eastern suburbs required a residence that could accommodate formal entertaining, multi-generational family life, and a significant art collection — all within a single architectural language. Our response organises the programme into a series of pavilions linked by glazed corridors, allowing each function its own spatial identity while maintaining visual connection to the landscaped grounds. The main pavilion houses living and dining spaces under a 5-metre timber-lined ceiling; a separate bedroom wing provides acoustic privacy; and a gallery wing with controlled north-facing light displays the client\'s collection. External spaces are treated as rooms without roofs — a colonnaded terrace, a fire pit courtyard, a pool pavilion. The estate demonstrates that large-scale residential architecture need not sacrifice intimacy for grandeur. Every space, however generous, is calibrated for human occupation.',
    images: [img('48-14'), img('48-14-1'), img('48-00-2'), img('48-01')],
  },
  {
    id: 'interior-residence-02',
    title: 'Minimalist Residence Interior',
    category: 'interior',
    location: 'Johannesburg',
    year: '2024',
    description: 'The owners of this Johannesburg residence wanted an interior that would recede — a quiet backdrop for daily life and their evolving art collection. The challenge was that the existing layout was fragmented: small rooms, narrow corridors, and inconsistent ceiling heights. Our intervention removed all non-structural internal walls on the ground floor, creating a continuous L-shaped living space that follows the sun across the day. A new steel-framed glazed extension to the garden adds volume and light. The material palette is deliberately narrow: white micro-cement floors, lime-washed walls, dark-stained oak joinery, and linen throughout. The result is an interior that reads as a single volume articulated by light and furniture rather than walls — a space that feels larger than its square metreage, quieter than its urban context, and more intentional than its budget would suggest.',
    images: [img('48-02'), img('48-03'), img('48-04'), img('48-05')],
  },
  {
    id: 'renovation-victorian-01',
    title: 'Victorian Terrace Renovation',
    category: 'renovations',
    location: 'Kensington',
    year: '2025',
    description: 'Victorian terrace houses are defined by their narrow frontage and deep plan — a geometry that often leaves rear rooms dark and disconnected from the garden. This Kensington terrace suffered from the classic condition: a warren of small rooms at the back, a damp basement, and no visual connection to the outdoor space. Our solution removed the entire rear wall and replaced it with a two-storey glazed structure wrapped around a protected courtyard. The ground floor becomes a continuous kitchen-dining-garden sequence; the first-floor extension accommodates a new main bedroom suite with terrace. Existing front rooms were restored — original cornices, ceiling roses, and a cast-iron fireplace retained. The project proves that even constrained urban sites can be transformed into fluid, light-filled homes when the intervention is precise and the existing fabric is treated with respect.',
    images: [img('48-05-1'), img('48-06'), img('48-06-1'), img('48-07')],
  },
  {
    id: 'residential-coastal-01',
    title: 'Coastal Retreat',
    category: 'residential',
    location: 'Durban',
    year: '2025',
    description: 'Coastal sites demand a fundamentally different architectural response — one that works with wind, salt, and intense subtropical light rather than against them. This Durban residence sits on a narrow dune parcel with strict building lines and a 10-metre height restriction. Our strategy was to lift the main living volume to first-floor level, capturing ocean views above the dune vegetation while allowing ground-level spaces to engage with the garden. Deep wraparound verandas protect glazed surfaces from direct sun and driving rain, while cross-ventilation is engineered through louvred openings at both high and low levels — eliminating the need for air conditioning in all but the hottest weeks. Materials were selected for durability in marine conditions: fair-face concrete, untreated cedar, and stainless steel that will weather gracefully rather than degrade. The house breathes with its site — responsive, resilient, and at ease in its environment.',
    images: [img('48-07-1'), img('48-08'), img('48-08-1'), img('48-09')],
  },
  {
    id: 'rendering-sketch-01',
    title: 'Architectural Sketch Renderings',
    category: 'renderings',
    location: 'Various',
    year: '2025',
    description: 'Before the BIM model, before the technical drawings, there is the sketch — the fastest way to test an idea, capture an atmosphere, and communicate a spatial intuition. This collection brings together hand-drawn and digitally rendered sketches produced during the early conceptual phases of residential and commercial projects. Each sketch prioritises atmosphere over accuracy: shadow studies, material gestures, and the play of light across a volume. These are not presentation drawings — they are thinking tools, created rapidly in conversation with clients to explore directions before committing to detailed design. What they lack in photorealism they gain in honesty: a sketch reveals the architect\'s thinking in a way that a rendered image never can. For Selrahc Architects, sketching remains the most direct line between an idea and its expression — and these works document that creative process at its most immediate.',
    images: [img('48-09-1'), img('48-10'), img('48-10-1'), img('48-11')],
  },
  {
    id: 'conceptual-pavilion-01',
    title: 'Garden Pavilion Concept',
    category: 'conceptual',
    location: 'Johannesburg',
    year: '2024',
    description: 'What happens when architecture tries to disappear? This conceptual pavilion for a Johannesburg garden explores the threshold between inside and outside as a question rather than an answer. The design is radically simple: a glazed volume suspended within a lightweight steel frame, with no fixed enclosure on three sides. Motorised glass walls slide into concealed pockets, transforming the pavilion from enclosed room to open shelter to floating platform as the occupants desire. A continuous timber deck extends the interior plane into the garden, blurring the edge between built and planted. The roof plane floats above the glass on slender columns, appearing to hover. The project is intentionally minimal — not as a stylistic choice but as a conceptual one: to test whether architecture can facilitate a direct experience of landscape without mediating it. The answer, we believe, is yes — but only when every element of enclosure is questioned.',
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
