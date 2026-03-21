export interface Developer {
  id: string;
  name: string;
  avatar?: string;
  verified: boolean;
  segment: 'Premium' | 'Standard' | 'Social';
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

export interface LocationData {
  city: string;
  neighborhood: string;
  marketTension: number; // 0-10
  avgSqmPrice: number;
  safetyScore: number;
}

export interface Project {
  id: string;
  developerId: string;
  name: string;
  status: 'planning' | 'construction' | 'delivered' | 'cancelled';
  typeAsset: 'apartment' | 'villa' | 'office' | 'retail';
  address: string;
  location: LocationData;
  images: string[];
  dates: {
    launch: string;
    deliveryProjected: string;
    deliveryActual?: string;
  };
  stats: {
    unitsCount: number;
    soldPercentage: number;
  };
  prices: {
    sqmLaunch: number;
    sqmObserved?: number;
  };
  scores: {
    global: number;
    trust: number;
    location: number;
    investment: number;
    quality: number;
  };
  dataConfidenceLevel: number; // 0-100%
  constructionProgress?: number; // 0-100%
  predictedDelayMonths?: number;
  priceHistory?: { date: string; avgSqmPrice: number }[];
  legalAudit?: {
    isCertified: boolean;
    certificateUrl?: string;
    lastAuditDate: string;
    auditors: string[]; // Expert IDs
  };
  financeProfile?: {
    isTaxEfficient: boolean; // E.g. LMNP compatible
    projectedYieldNet: number;
    marketDemandScore: number;
  };
}

export interface Unit {
  id: string;
  projectId: string;
  type: string;
  surface: number;
  floor: number;
  orientation: string;
  price: number;
  yield: number;
  features: string[];
  status: 'available' | 'reserved' | 'sold';
}

export interface ImmoReview {
  id: string;
  userId: string;
  targetType: 'project' | 'developer';
  targetId: string;
  relationType: 'buyer' | 'resident' | 'prospect' | 'investor';
  verificationLevel: 'none' | 'proof_submitted' | 'proof_verified';
  moderationStatus: 'pending' | 'published' | 'rejected';
  ratings: {
    global: number;
    finishing: number;
    delay: number;
    conformity: number;
    sav?: number;
  };
  commentRaw: string;
  commentModerated?: string;
  createdAt: string;
  proofs?: Proof[];
  disputeDetails?: {
    status: 'open' | 'pending' | 'resolved' | 'rejected' | 'none';
    message?: string;
    developerResponse?: string;
    resolvedAt?: string;
  };
}

export interface Proof {
  id: string;
  reviewId: string;
  type: string; // 'reservation_contract', 'title_deed', etc.
  fileUrl: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
