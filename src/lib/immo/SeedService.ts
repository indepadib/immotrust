import { supabase } from '@/lib/supabase/client';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';

export class SeedService {
  /**
   * Seeds the database with the initial mock data to ensure a "WOW" experience.
   * Hardened to match the actual table schema.
   */
  static async seedAll(): Promise<void> {
    console.log('[SeedService] Starting hardened data ingestion...');

    // 1. Seed Developers (Simplified to match schema)
    for (const dev of MOCK_DEVELOPERS) {
      const { error: devErr } = await supabase
        .from('developers')
        .upsert({
          id: dev.id,
          name: dev.name,
          verified: true,
          segment: ['Premium', 'Standard', 'Social'].includes(dev.segment) ? dev.segment : 'Standard',
          stats: {
            projectsCount: dev.stats.projectsCount,
            ratingCount: dev.stats.ratingCount,
            avgDelayMonths: dev.stats.avgDelayMonths
          },
          scores: dev.scores
        });

      if (devErr) console.error(`[SeedService] Error seeding developer ${dev.name}:`, devErr);
    }

    // 2. Seed Projects (Aligned with schema)
    for (const project of MOCK_PROJECTS) {
      const { error: projErr } = await supabase
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
        });

      if (projErr) console.error(`[SeedService] Error seeding project ${project.name}:`, projErr);
    }

    console.log('[SeedService] Hardened seeding complete.');
  }
}
