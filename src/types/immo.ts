export interface Developer {
  id: string; // UUID
  companyId: string; // TEXT (Link to public.companies)
  name: string;
  avatar?: string;
  developerType?: string;
  marketSegment?: string;
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
  };
  constructionProgress?: number; // 0-100%
  predictedDelayMonths?: number;
  dataConfidenceLevel?: number;
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
  disputeDetails?: {
    status: 'open' | 'pending' | 'resolved' | 'closed';
  };
  createdAt: string;
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
