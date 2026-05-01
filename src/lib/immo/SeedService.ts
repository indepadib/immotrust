import { supabase } from '@/lib/supabase/client';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';

export class SeedService {
  /**
   * Seeds the database with the initial mock data to ensure a "WOW" experience.
   */
  static async seedAll(): Promise<void> {
    console.log('[SeedService] Starting data ingestion...');

    // 1. Seed Companies & Developers
    for (const dev of MOCK_DEVELOPERS) {
      // Create Company first (public.companies)
      const { data: company, error: compErr } = await supabase
        .from('companies')
        .upsert({
          id: dev.companyId,
          name: dev.name,
          logo_url: dev.avatar,
          company_type: 'real_estate_developer',
          is_active: true
        })
        .select()
        .single();

      if (compErr) {
        console.error(`[SeedService] Error seeding company ${dev.name}:`, compErr);
        continue;
      }

      // Create Developer (realestate.developers)
      const { error: devErr } = await supabase
        .from('developers')
        .upsert({
          id: dev.id,
          company_id: company.id,
          developer_type: dev.developerType,
          market_segment: dev.marketSegment,
          reputation_score: dev.scores.reputation,
          quality_score: dev.scores.quality,
          delay_score: dev.scores.delays,
          aftersales_score: dev.scores.sav,
          project_count: dev.stats.projectsCount,
          review_count: dev.stats.ratingCount,
          avatar_url: dev.avatar,
          segment: dev.segment
        });

      if (devErr) console.error(`[SeedService] Error seeding developer ${dev.name}:`, devErr);
    }

    // 2. Seed Projects
    for (const project of MOCK_PROJECTS) {
      const { error: projErr } = await supabase
        .from('projects')
        .upsert({
          id: project.id.includes('-') ? project.id : undefined, // Only use UUIDs if valid
          developer_id: project.developerId,
          name: project.name,
          slug: project.slug,
          city: project.city,
          district: project.district,
          address: project.address,
          project_type: project.projectType,
          status: project.status,
          launch_date: project.dates.launch,
          expected_delivery_date: project.dates.deliveryProjected,
          min_price_mad: project.prices.min,
          max_price_mad: project.prices.max,
          price_per_m2_mad: project.prices.avgSqm,
          audit_status: project.audit.status,
          trust_score: project.audit.trustScore,
          image_urls: project.images,
          construction_progress: project.constructionProgress,
          units_count: project.stats.unitsCount,
          sold_percentage: project.stats.soldPercentage,
          metadata: {
            confidenceLevel: project.dataConfidenceLevel,
            predictedDelayMonths: project.predictedDelayMonths,
            standing: project.standing,
            trustScoreBreakdown: project.metadata?.trustScoreBreakdown
          }
        });

      if (projErr) console.error(`[SeedService] Error seeding project ${project.name}:`, projErr);
    }

    // 3. Seed Market Stats
    const marketSectors = [
      { district: 'CFC', price: 28500, tension: 8 },
      { district: 'Anfa', price: 32000, tension: 7 },
      { district: 'Bouskoura', price: 18500, tension: 6 },
      { district: 'Dar Bouazza', price: 14200, tension: 9 },
      { district: 'Maarif', price: 16500, tension: 7 },
      { district: 'Racine', price: 21000, tension: 8 }
    ];

    for (const sector of marketSectors) {
      const { error: statErr } = await supabase
        .from('market_stats')
        .upsert({
          district: sector.district,
          avg_price_per_m2: sector.price,
          demand_tension_score: sector.tension,
          observed_at: new Date().toISOString()
        });
      
      if (statErr) console.error(`[SeedService] Error seeding market stats for ${sector.district}:`, statErr);
    }

    // 4. Seed User Profiles (Experts)
    const experts = [
      { id: 'user-001', name: 'Karim B.', karma: 5200, reviews: 45, badge: 'Légendaire' },
      { id: 'user-002', name: 'Sarah L.', karma: 1250, reviews: 32, badge: 'Sénior' },
      { id: 'user-003', name: 'Omar T.', karma: 420, reviews: 28, badge: 'Vérifié' }
    ];

    for (const exp of experts) {
      const { error: userErr } = await supabase
        .from('user_profiles')
        .upsert({
          id: exp.id,
          full_name: exp.name,
          karma_points: exp.karma,
          review_count: exp.reviews,
          badge_title: exp.badge,
          updated_at: new Date().toISOString()
        });
      
      if (userErr) console.error(`[SeedService] Error seeding user profile ${exp.name}:`, userErr);
    }

    console.log('[SeedService] Seeding complete.');
  }
}
