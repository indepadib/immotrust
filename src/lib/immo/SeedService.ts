import { supabase } from '@/lib/supabase/client';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';

export class SeedService {
  /**
   * Seeds the database with the initial mock data.
   * Explicitly targets the 'realestate' schema to avoid search_path issues.
   */
  static async seedAll(): Promise<void> {
    console.log('[SeedService] Starting data ingestion (Schema: realestate)...');

    // 1. Seed Developers
    for (const dev of MOCK_DEVELOPERS) {
      const { data, error: devErr } = await supabase
        .schema('realestate')
        .from('developers')
        .upsert({
          id: dev.id,
          name: dev.name,
          verified: true,
          segment: (dev.segment && ['Premium', 'Standard', 'Social'].includes(dev.segment)) ? dev.segment : 'Standard',
          stats: {
            projectsCount: dev.stats.projectsCount,
            ratingCount: dev.stats.ratingCount,
            avgDelayMonths: dev.stats.avgDelayMonths
          },
          scores: dev.scores
        })
        .select();

      if (devErr) {
        console.error(`[SeedService] Error seeding developer ${dev.name}:`, devErr);
      } else {
        console.log(`[SeedService] Seeded developer: ${dev.name} (${data?.[0]?.id})`);
      }
    }

    // 2. Seed Projects
    for (const project of MOCK_PROJECTS) {
      const { data, error: projErr } = await supabase
        .schema('realestate')
        .from('projects')
        .upsert({
          id: project.id.includes('-') ? project.id : undefined,
          developer_id: project.developerId,
          name: project.name,
          status: ['planning', 'construction', 'delivered', 'cancelled'].includes(project.status) ? project.status : 'planning',
          type_asset: project.projectType,
          address: project.address,
          location: {
            city: project.city,
            district: project.district
          },
          images: project.images,
          dates: project.dates,
          stats: project.stats,
          prices: project.prices,
          scores: {
            trust: project.audit.trustScore,
            ...project.metadata?.trustScoreBreakdown
          },
          data_confidence_level: project.dataConfidenceLevel,
          metadata: project.metadata
        })
        .select();

      if (projErr) {
        console.error(`[SeedService] Error seeding project ${project.name}:`, projErr);
      } else {
        console.log(`[SeedService] Seeded project: ${project.name} (${data?.[0]?.id})`);
      }
    }

    console.log('[SeedService] Hardened seeding complete.');
  }
}
