import { Developer, Project } from '../types/immo';

export const MOCK_DEVELOPERS: Developer[] = [
  {
    id: 'd8c4b1a0-5b5c-4e8a-9a9a-3a3a3a3a3a3a',
    companyId: 'company-1',
    name: 'Al Akaria Dévelopement',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80',
    developerType: 'National Developer',
    marketSegment: 'Premium / Middle-Standing',
    segment: 'Premium',
    stats: {
      projectsCount: 45,
      unitsDelivered: 12500,
      avgDelayMonths: 2.5,
      ratingCount: 840
    },
    scores: {
      reputation: 8.5,
      quality: 8.2,
      delays: 7.8,
      sav: 7.5
    }
  },
  {
    id: 'e1d2c3b4-a5b6-4c7d-8e9f-0a1b2c3d4e5f',
    companyId: 'company-2',
    name: 'Prestigia Maroc',
    avatar: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80',
    developerType: 'Premium',
    marketSegment: 'Social/Medium',
    segment: 'High-End',
    stats: {
      projectsCount: 12,
      unitsDelivered: 3200,
      avgDelayMonths: 0.5,
      ratingCount: 450
    },
    scores: {
      reputation: 9.1,
      quality: 8.9,
      delays: 9.4,
      sav: 8.2
    }
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'f1a2b3c4-d5e6-4f7g-8h9i-0j1k2l3m4n5o',
    developerId: 'e1d2c3b4-a5b6-4c7d-8e9f-0a1b2c3d4e5f',
    name: 'CFC Luxury Residences',
    slug: 'cfc-luxury-residences',
    city: 'Casablanca',
    district: 'CFC / Anfa',
    address: 'CFC Main Blvd, Casablanca',
    projectType: 'apartment',
    status: 'construction',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687940-4e524cb35d05?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec239f3d689?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'haut',
    dates: {
      launch: '2023-01-15',
      deliveryProjected: '2025-06-30'
    },
    prices: {
      min: 1950000,
      max: 4500000,
      avgSqm: 28000
    },
    stats: {
      unitsCount: 120,
      soldPercentage: 85
    },
    audit: {
      status: 'verified',
      trustScore: 9.4,
    },
    constructionProgress: 65,
    predictedDelayMonths: 0,
    dataConfidenceLevel: 98,
  },
  {
    id: 'b1c2d3e4-f5g6-7h8i-9j0k-1l2m3n4o5p6q',
    developerId: 'd8c4b1a0-5b5c-4e8a-9a9a-3a3a3a3a3a3a',
    name: 'Anfa Sky Tower',
    slug: 'anfa-sky-tower',
    city: 'Casablanca',
    district: 'Anfa Park',
    address: 'Anfa Park, Casablanca',
    projectType: 'apartment',
    status: 'construction',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'haut',
    dates: {
      launch: '2023-06-01',
      deliveryProjected: '2026-12-30'
    },
    prices: {
      min: 2400000,
      max: 8900000,
      avgSqm: 32000
    },
    stats: {
      unitsCount: 88,
      soldPercentage: 40
    },
    audit: {
      status: 'verified',
      trustScore: 9.2
    },
    constructionProgress: 30,
    predictedDelayMonths: 1,
    dataConfidenceLevel: 90,
  },
  {
    id: 'p2',
    developerId: 'd8c4b1a0-5b5c-4e8a-9a9a-3a3a3a3a3a3a',
    name: "Les Terrasses de l'Océan",
    slug: 'terrasses-ocean',
    city: 'Casablanca',
    district: 'Dar Bouaza',
    address: 'Route d\'Azemmour, Dar Bouaza',
    projectType: 'Résidentiel Haut Standing',
    status: 'construction',
    images: ['/projects/p2-1.jpg'],
    dates: {
      launch: '2023-01-15',
      deliveryProjected: '2025-06-30'
    },
    prices: {
      min: 1400000,
      max: 3200000,
      avgSqm: 18500
    },
    stats: {
      unitsCount: 45,
      soldPercentage: 40
    },
    audit: {
      status: 'pending',
      trustScore: 7.8,
    },
    constructionProgress: 20,
    predictedDelayMonths: 3,
    dataConfidenceLevel: 85,
    standing: 'haut',
  },
  {
    id: 'p3',
    developerId: 'd8c4b1a0-5b5c-4e8a-9a9a-3a3a3a3a3a3a',
    name: "Atlas Hills Marrakech",
    slug: 'atlas-hills',
    city: 'Marrakech',
    district: 'Palmeraie',
    address: 'Route de la Palmeraie, Marrakech',
    projectType: 'Villa Resort',
    status: 'delivered',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format&fit=crop'
    ],
    dates: {
      launch: '2021-01-15',
      deliveryProjected: '2023-01-15',
      deliveryActual: '2023-03-20'
    },
    prices: {
      min: 4500000,
      max: 12000000,
      avgSqm: 22000
    },
    stats: {
      unitsCount: 24,
      soldPercentage: 100
    },
    audit: {
      status: 'verified',
      trustScore: 9.6,
    },
    constructionProgress: 100,
    predictedDelayMonths: 2,
    dataConfidenceLevel: 99,
    standing: 'luxe',
  }
];
