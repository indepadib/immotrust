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
            predictedDelayMonths: project.predictedDelayMonths
          }
        });

      if (projErr) console.error(`[SeedService] Error seeding project ${project.name}:`, projErr);
    }

    console.log('[SeedService] Seeding complete.');
  }
}
