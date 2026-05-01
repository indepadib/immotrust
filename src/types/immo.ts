export interface Developer {
  id: string; // UUID
  companyId: string; // TEXT (Link to public.companies)
  name: string;
  avatar?: string;
  developerType?: string;
  marketSegment?: string;
  segment?: string; // Required for DeveloperCard
  stats: {
    projectsCount: number;
    unitsDelivered: number;
    avgDelayMonths: number;
    ratingCount: number;
  };
  scores: {
    reputation: number;
    quality: number;
    delays: number;
    sav: number;
  };
}

export interface Project {
  id: string; // UUID
  developerId: string; // UUID (Link to realestate.developers)
  developer?: {
    id: string;
    name: string;
    avatar: string;
  };
  name: string;
  slug: string;
  city: string;
  district: string;
  address: string;
  latitude?: number;
  longitude?: number;
  projectType: string;
  status: 'planning' | 'construction' | 'delivered' | 'cancelled';
  images: string[];
  dates: {
    launch: string;
    deliveryProjected: string;
    deliveryActual?: string;
  };
  prices: {
    min: number;
    max: number;
    avgSqm: number;
  };
  stats: {
    unitsCount: number;
    soldPercentage: number;
  };
  audit: {
    status: 'not_started' | 'pending' | 'verified' | 'rejected';
    trustScore: number;
    trustScoreBreakdown?: {
      factual: number;
      sentiment: number;
      audit: number;
      risk: number;
    };
  };
  constructionProgress?: number; // 0-100%
  predictedDelayMonths?: number;
  dataConfidenceLevel?: number;
  standing?: 'economique' | 'moyen' | 'haut' | 'luxe';
  metadata?: {
    standing?: 'economique' | 'moyen' | 'haut' | 'luxe';
    predictedDelayMonths?: number;
    confidenceLevel?: number;
    trustScoreBreakdown?: {
      investment: number;
      longTerm: number;
      airbnb: number;
    };
    features?: string[];
    alerts?: string[];
  };
}

export interface ImmoReview {
  id: string;
  userId: string;
  projectId: string;
  ratingOverall: number;
  ratingDelivery?: number;
  ratingQuality?: number;
  ratingAftersales?: number;
  ratingValueForMoney?: number;
  title?: string;
  body?: string;
  reviewStatus: 'pending' | 'published' | 'rejected';
  moderationStatus?: 'pending' | 'published' | 'rejected'; // Alias for compatibility
  purchaseVerified: boolean;
  reviewerType: string;
  relationType?: string;
  evidenceLevel?: string;
  disputeDetails?: {
    status: 'open' | 'pending' | 'resolved' | 'closed';
  };
  createdAt: string;
  category?: 'quality' | 'delivery' | 'sav' | 'value';
}

export interface MarketStats {
  id: string;
  projectId?: string;
  observedAt: string;
  avgPricePerM2: number;
  resaleRate?: number;
  demandTensionScore?: number;
  rentalYieldEstimate?: number;
  sourceType?: string;
  sourceUrl?: string;
  confidenceScore?: number;
}

export interface ScrapedProject {
  id: string;
  title: string;
  price: number;
  location: string;
  neighborhood: string;
  area: number;
  pricePerMeter: number;
  description: string;
  images: string[];
  features: string[];
  scrapedAt: string;
  source: string;
  status: string;
  name?: string; // For compatibility
  scores?: {
    trust: number;
  };
  audit?: {
    trustScore: number;
  };
}

export interface Unit {
  id: string;
  type: string;
  floor: string | number;
  surface: number;
  orientation: string;
  price: number;
  yield: number;
}

export interface InvestorProfile {
  budgetMin: number;
  budgetMax: number;
  strategy: 'safe' | 'balanced' | 'aggressive';
  preferredZones: string[];
}
