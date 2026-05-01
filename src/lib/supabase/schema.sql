-- Avis Promoteur Maroc Core Schema

-- 1. Developers
CREATE TABLE developers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    segment TEXT CHECK (segment IN ('Premium', 'Standard', 'Social')),
    stats JSONB DEFAULT '{}',
    scores JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID REFERENCES developers(id),
    name TEXT NOT NULL,
    status TEXT CHECK (status IN ('planning', 'construction', 'delivered', 'cancelled')),
    type_asset TEXT,
    address TEXT,
    location JSONB, -- city, neighborhood, market_tension...
    images TEXT[],
    dates JSONB, -- launch, delivery_projected...
    stats JSONB, -- units_count, sold_percentage...
    prices JSONB, -- sqm_launch, sqm_observed...
    scores JSONB, -- global, trust, location...
    data_confidence_level INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Reviews
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    target_type TEXT CHECK (target_type IN ('project', 'developer')),
    target_id UUID NOT NULL,
    relation_type TEXT,
    verification_level TEXT DEFAULT 'none',
    moderation_status TEXT DEFAULT 'pending',
    ratings JSONB NOT NULL,
    comment_raw TEXT,
    comment_moderated TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Proofs
CREATE TABLE proofs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    type TEXT,
    file_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);
