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
  },
  {
    id: 'dev-next-house',
    companyId: 'comp-next-house',
    name: 'Next House',
    avatar: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&q=80',
    developerType: 'Haut Standing',
    marketSegment: 'Eco-Cité',
    segment: 'Premium',
    stats: { projectsCount: 5, unitsDelivered: 450, avgDelayMonths: 4, ratingCount: 120 },
    scores: { reputation: 8.2, quality: 9.0, delays: 6.5, sav: 8.2 }
  },
  {
    id: 'dev-paloma',
    companyId: 'comp-paloma',
    name: 'Paloma Bay',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80',
    developerType: 'Résidentiel Marina',
    marketSegment: 'Bord de Mer',
    segment: 'Luxe',
    stats: { projectsCount: 3, unitsDelivered: 280, avgDelayMonths: 14, ratingCount: 85 },
    scores: { reputation: 7.5, quality: 9.5, delays: 4.2, sav: 8.5 }
  },
  {
    id: 'dev-clef',
    companyId: 'comp-clef',
    name: 'La Clef Développement',
    avatar: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&q=80',
    developerType: 'Promotion Immobilière',
    marketSegment: 'Modern Living',
    segment: 'Standard',
    stats: { projectsCount: 8, unitsDelivered: 1200, avgDelayMonths: 3, ratingCount: 210 },
    scores: { reputation: 7.9, quality: 7.5, delays: 6.8, sav: 7.2 }
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'zenata-1',
    developerId: 'dev-next-house',
    name: 'Gardenia Parc Zenata',
    slug: 'gardenia-parc-zenata',
    city: 'Casablanca',
    district: 'Zenata Eco-Cité',
    address: 'Secteur Résidentiel, Zenata',
    projectType: 'Appartements Bio-climatiques',
    status: 'delivered',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'haut',
    dates: { launch: '2021-03-01', deliveryProjected: '2023-12-30', deliveryActual: '2024-02-15' },
    prices: { min: 1100000, max: 2800000, avgSqm: 14500 },
    stats: { unitsCount: 180, soldPercentage: 100 },
    audit: { status: 'verified', trustScore: 8.5 },
    constructionProgress: 100,
    predictedDelayMonths: 2,
    dataConfidenceLevel: 95
  },
  {
    id: 'zenata-next-front',
    developerId: 'dev-next-house',
    name: 'Next House Zenata Front Mer',
    slug: 'next-house-front-mer',
    city: 'Casablanca',
    district: 'Zenata Eco-Cité',
    address: 'Première Ligne de Mer, Zenata',
    projectType: 'Résidentiel Premium',
    status: 'construction',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'luxe',
    dates: { launch: '2023-01-01', deliveryProjected: '2025-03-01' },
    prices: { min: 1800000, max: 6200000, avgSqm: 19500 },
    stats: { unitsCount: 65, soldPercentage: 85 },
    audit: { status: 'verified', trustScore: 8.1 },
    constructionProgress: 85,
    predictedDelayMonths: 6, // Prevévu Mars, estimé Septembre
    dataConfidenceLevel: 98
  },
  {
    id: 'zenata-2',
    developerId: 'dev-paloma',
    name: 'Paloma Bay Zenata',
    slug: 'paloma-bay-zenata',
    city: 'Casablanca',
    district: 'Zenata Marina',
    address: 'Front de Mer, Zenata',
    projectType: 'Appartements de Luxe',
    status: 'construction',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'luxe',
    dates: { launch: '2022-01-01', deliveryProjected: '2023-06-30' },
    prices: { min: 1600000, max: 5500000, avgSqm: 18500 },
    stats: { unitsCount: 95, soldPercentage: 90 },
    audit: { status: 'verified', trustScore: 7.2 },
    constructionProgress: 95,
    predictedDelayMonths: 14, // Retard de plus d'un an
    dataConfidenceLevel: 92
  },
  {
    id: 'zenata-3',
    developerId: 'dev-clef',
    name: 'Les Arènes de Zenata',
    slug: 'arenes-zenata',
    city: 'Casablanca',
    district: 'Zenata Centre',
    address: 'Place Centrale, Zenata',
    projectType: 'Résidence de Standing',
    status: 'construction',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'haut',
    dates: { launch: '2022-10-01', deliveryProjected: '2025-03-30' },
    prices: { min: 950000, max: 2100000, avgSqm: 13200 },
    stats: { unitsCount: 240, soldPercentage: 80 },
    audit: { status: 'verified', trustScore: 8.2 },
    constructionProgress: 75,
    predictedDelayMonths: 4,
    dataConfidenceLevel: 88
  },
  {
    id: 'zenata-4',
    developerId: 'dev-next-house',
    name: 'Zenata Tower',
    slug: 'zenata-tower',
    city: 'Casablanca',
    district: 'Zenata Eco-Cité',
    address: 'Skyline District, Zenata',
    projectType: 'Tour Iconique',
    status: 'planning',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'haut',
    dates: { launch: '2024-01-01', deliveryProjected: '2027-12-30' },
    prices: { min: 1400000, max: 4200000, avgSqm: 16800 },
    stats: { unitsCount: 110, soldPercentage: 10 },
    audit: { status: 'pending', trustScore: 7.5 },
    constructionProgress: 5,
    predictedDelayMonths: 0,
    dataConfidenceLevel: 80
  },
  {
    id: 'zenata-5',
    developerId: 'dev-clef',
    name: 'Glorious Zenata',
    slug: 'glorious-zenata',
    city: 'Casablanca',
    district: 'Zenata Eco-Cité',
    address: 'Boulevard de l\'Environnement, Zenata',
    projectType: 'Résidence Familiale',
    status: 'construction',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop'
    ],
    standing: 'moyen',
    dates: { launch: '2023-01-15', deliveryProjected: '2026-01-15' },
    prices: { min: 850000, max: 1800000, avgSqm: 11500 },
    stats: { unitsCount: 150, soldPercentage: 55 },
    audit: { status: 'verified', trustScore: 8.5 },
    constructionProgress: 40,
    predictedDelayMonths: 3,
    dataConfidenceLevel: 90
  }
];
