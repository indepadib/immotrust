import { Developer, Project } from '../types/immo';

export const MOCK_DEVELOPERS: Developer[] = [
  {
    id: 'dev-realites',
    companyId: 'comp-realites',
    name: 'Réalités Afrique',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80',
    developerType: 'International / Premium',
    marketSegment: 'Haut Standing',
    segment: 'Premium',
    stats: { projectsCount: 15, unitsDelivered: 4500, avgDelayMonths: 2, ratingCount: 320 },
    scores: { reputation: 8.5, quality: 8.2, delays: 7.8, sav: 7.5 }
  },
  {
    id: 'dev-allali',
    companyId: 'comp-allali',
    name: 'Groupe Allali',
    avatar: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80',
    developerType: 'National / Familial',
    marketSegment: 'Résidentiel Durable',
    segment: 'Standard',
    stats: { projectsCount: 12, unitsDelivered: 3200, avgDelayMonths: 4, ratingCount: 210 },
    scores: { reputation: 7.9, quality: 7.5, delays: 6.8, sav: 7.2 }
  },
  {
    id: 'dev-perfection',
    companyId: 'comp-perfection',
    name: 'Groupe La Perfection',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80',
    developerType: 'Promotion Immobilière',
    marketSegment: 'Moderne / Design',
    segment: 'Premium',
    stats: { projectsCount: 8, unitsDelivered: 1500, avgDelayMonths: 3, ratingCount: 145 },
    scores: { reputation: 8.2, quality: 8.5, delays: 7.5, sav: 8.0 }
  },
  {
    id: 'dev-tgcc',
    companyId: 'comp-tgcc',
    name: 'TGCC Immobilier',
    avatar: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&q=80',
    developerType: 'Leader Construction / Immo',
    marketSegment: 'Luxe / Business',
    segment: 'Premium',
    stats: { projectsCount: 25, unitsDelivered: 8500, avgDelayMonths: 1, ratingCount: 560 },
    scores: { reputation: 9.2, quality: 8.9, delays: 9.5, sav: 8.5 }
  },
  {
    id: 'dev-mfadel',
    companyId: 'comp-mfadel',
    name: 'Groupe Mfadel',
    avatar: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&q=80',
    developerType: 'National / Diversifié',
    marketSegment: 'Tours / Haut Standing',
    segment: 'Premium',
    stats: { projectsCount: 18, unitsDelivered: 5200, avgDelayMonths: 3, ratingCount: 280 },
    scores: { reputation: 8.0, quality: 8.4, delays: 7.2, sav: 7.8 }
  }
];

export const MOCK_PROJECTS: Project[] = [
  // ZENATA ZONE
  {
    id: 'zenata-gardenia',
    developerId: 'dev-realites',
    name: 'Gardenia Parc Zenata',
    slug: 'gardenia-parc-zenata',
    city: 'Casablanca',
    district: 'Zenata Éco-Cité',
    address: 'Secteur Résidentiel, Zenata',
    projectType: 'Résidence Nouvelle Génération',
    status: 'delivered',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop'],
    standing: 'haut',
    dates: { launch: '2021-03-01', deliveryProjected: '2024-02-15' },
    prices: { min: 951000, max: 2800000, avgSqm: 12000 },
    stats: { unitsCount: 180, soldPercentage: 95 },
    audit: { status: 'verified', trustScore: 7.5 },
    constructionProgress: 100,
    dataConfidenceLevel: 95,
    metadata: {
       standing: 'haut',
       trustScoreBreakdown: {
         investment: 7.5,
         longTerm: 7.0,
         airbnb: 6.5
       }
    }
  },
  {
    id: 'zenata-life-city',
    developerId: 'dev-allali',
    name: 'Life City Zenata',
    slug: 'life-city-zenata',
    city: 'Casablanca',
    district: 'Zenata Éco-Cité',
    address: 'Zenata éco-responsable',
    projectType: 'Résidence Fermée Familiale',
    status: 'construction',
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop'],
    standing: 'moyen',
    dates: { launch: '2022-01-01', deliveryProjected: '2025-12-30' },
    prices: { min: 768750, max: 1800000, avgSqm: 10500 },
    stats: { unitsCount: 274, soldPercentage: 65 },
    audit: { status: 'verified', trustScore: 7.0 },
    constructionProgress: 60,
    dataConfidenceLevel: 85,
    metadata: {
       standing: 'moyen',
       trustScoreBreakdown: {
         investment: 7.0,
         longTerm: 7.5,
         airbnb: 6.0
       }
    }
  },
  {
    id: 'zenata-side-park',
    developerId: 'dev-perfection',
    name: 'Side Park Zenata',
    slug: 'side-park-zenata',
    city: 'Casablanca',
    district: 'Zenata Éco-Cité',
    address: 'Face au Parc Central, Zenata',
    projectType: 'Moderne / Terrasses',
    status: 'construction',
    images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000&auto=format&fit=crop'],
    standing: 'haut',
    dates: { launch: '2023-01-01', deliveryProjected: '2026-10-30' },
    prices: { min: 580000, max: 1625000, avgSqm: 11500 },
    stats: { unitsCount: 120, soldPercentage: 45 },
    audit: { status: 'verified', trustScore: 8.0 },
    constructionProgress: 45,
    dataConfidenceLevel: 98,
    metadata: {
       standing: 'haut',
       trustScoreBreakdown: {
         investment: 8.0,
         longTerm: 7.0,
         airbnb: 7.0
       }
    }
  },
  {
    id: 'zenata-tower',
    developerId: 'dev-mfadel',
    name: 'Zenata Tower',
    slug: 'zenata-tower',
    city: 'Casablanca',
    district: 'Zenata Éco-Cité',
    address: 'Zenata Business & Living',
    projectType: 'Tour Résidentielle Bioclimatique',
    status: 'construction',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'],
    standing: 'haut',
    dates: { launch: '2023-06-01', deliveryProjected: '2026-12-30' },
    prices: { min: 1100000, max: 4500000, avgSqm: 12500 },
    stats: { unitsCount: 163, soldPercentage: 35 },
    audit: { status: 'verified', trustScore: 8.0 },
    constructionProgress: 30,
    dataConfidenceLevel: 80,
    metadata: {
       standing: 'haut',
       trustScoreBreakdown: {
         investment: 8.0,
         longTerm: 7.5,
         airbnb: 7.0
       }
    }
  },

  // CFC ZONE
  {
    id: 'cfc-tour-33',
    developerId: 'dev-tgcc',
    name: 'Tour 33 CFC',
    slug: 'tour-33-cfc',
    city: 'Casablanca',
    district: 'CFC / Casa Anfa',
    address: 'Main Boulevard, CFC',
    projectType: 'Luxe Urbain / Terrasses',
    status: 'delivered',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop'],
    standing: 'luxe',
    dates: { launch: '2021-01-01', deliveryProjected: '2023-12-30' },
    prices: { min: 1890000, max: 5500000, avgSqm: 26000 },
    stats: { unitsCount: 150, soldPercentage: 100 },
    audit: { status: 'verified', trustScore: 8.5 },
    constructionProgress: 100,
    dataConfidenceLevel: 98,
    metadata: {
       standing: 'luxe',
       trustScoreBreakdown: {
         investment: 8.0,
         longTerm: 8.5,
         airbnb: 8.5
       }
    }
  },
  {
    id: 'cfc-aeria-park',
    developerId: 'dev-tgcc', // Aeria Park is Managem/Anfa Realties but let's associate for now
    name: 'Aeria Park CFC',
    slug: 'aeria-park-cfc',
    city: 'Casablanca',
    district: 'CFC / Casa Anfa',
    address: 'Boulevard Abdellah Cherif',
    projectType: 'Résidence Mixte Premium',
    status: 'delivered',
    images: ['https://images.unsplash.com/photo-1460317442991-0ec239f3d689?q=80&w=1000&auto=format&fit=crop'],
    standing: 'luxe',
    dates: { launch: '2020-01-01', deliveryProjected: '2023-01-01' },
    prices: { min: 2100000, max: 8000000, avgSqm: 28000 },
    stats: { unitsCount: 450, soldPercentage: 100 },
    audit: { status: 'verified', trustScore: 8.0 },
    constructionProgress: 100,
    dataConfidenceLevel: 90,
    metadata: {
       standing: 'luxe',
       trustScoreBreakdown: {
         investment: 7.5,
         longTerm: 8.0,
         airbnb: 8.0
       }
    }
  }
];
