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
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687940-c52af0490f7b?q=80&w=1000&auto=format&fit=crop'
    ],
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
  },
  {
    id: 'proj-2',
    developerId: 'dev-1',
    name: 'Anfa Sky Tower',
    status: 'construction',
    typeAsset: 'apartment',
    address: 'Anfa Park, Casablanca',
    location: {
      city: 'Casablanca',
      neighborhood: 'Anfa Park',
      marketTension: 9.8,
      avgSqmPrice: 32000,
      safetyScore: 9.8
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1000&auto=format&fit=crop'
    ],
    dates: {
      launch: '2023-06-01',
      deliveryProjected: '2026-12-30'
    },
    stats: {
      unitsCount: 88,
      soldPercentage: 40
    },
    prices: {
      sqmLaunch: 28000,
      sqmObserved: 34000
    },
    scores: {
      global: 9.2,
      trust: 9.8,
      location: 9.9,
      investment: 8.5,
      quality: 9.0
    },
    dataConfidenceLevel: 98,
    constructionProgress: 20,
    predictedDelayMonths: 0
  },
  {
    id: 'proj-3',
    developerId: 'dev-1',
    name: 'Les Terrasses de Bouskoura',
    status: 'delivered',
    typeAsset: 'villa',
    address: 'Bouskoura Golf City',
    location: {
      city: 'Casablanca',
      neighborhood: 'Bouskoura',
      marketTension: 8.5,
      avgSqmPrice: 22000,
      safetyScore: 9.2
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop'
    ],
    dates: {
      launch: '2021-01-01',
      deliveryProjected: '2023-12-01'
    },
    stats: {
      unitsCount: 45,
      soldPercentage: 100
    },
    prices: {
      sqmLaunch: 18000,
      sqmObserved: 23500
    },
    scores: {
      global: 8.5,
      trust: 8.2,
      location: 9.5,
      investment: 7.8,
      quality: 8.5
    },
    dataConfidenceLevel: 90,
    constructionProgress: 100,
    predictedDelayMonths: 6
  }
];
