import { Developer, Project } from '../types/immo';

export const MOCK_DEVELOPERS: Developer[] = [
  {
    id: 'dev-1',
    name: 'CGI (Compagnie Générale Immobilière)',
    verified: true,
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
    id: 'dev-2',
    name: 'Nexity Maroc',
    verified: true,
    segment: 'Premium',
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
    id: 'proj-1',
    developerId: 'dev-2',
    name: 'CFC Luxury Residences',
    status: 'construction',
    typeAsset: 'apartment',
    address: 'CFC Main Blvd, Casablanca',
    location: {
      city: 'Casablanca',
      neighborhood: 'CFC / Anfa',
      marketTension: 9.2,
      avgSqmPrice: 28000,
      safetyScore: 9.5
    },
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop'],
    dates: {
      launch: '2023-01-15',
      deliveryProjected: '2025-06-30'
    },
    stats: {
      unitsCount: 120,
      soldPercentage: 85
    },
    prices: {
      sqmLaunch: 24000,
      sqmObserved: 29500
    },
    scores: {
      global: 8.8,
      trust: 9.5,
      location: 9.0,
      investment: 8.2,
      quality: 8.5
    },
    dataConfidenceLevel: 94,
    constructionProgress: 65,
    predictedDelayMonths: 2.5
  }
];
