import { supabase } from '@/lib/supabase/client';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';

export class SeedService {
  /**
   * Seeds the database with the initial mock data.
   * Auto-detects if 'realestate' schema exists, otherwise falls back to public.
   */
  static async seedAll(): Promise<void> {
    console.log('[SeedService] Starting data ingestion...');

    // 1. Seed Developers
    for (const dev of MOCK_DEVELOPERS) {
      const payload = {
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
      };

      // Try public first as it's the safest default for most Supabase setups
      const { data, error: devErr } = await supabase
        .from('developers')
        .upsert(payload)
        .select();

      if (devErr) {
        console.error(`[SeedService] Error seeding developer ${dev.name}:`, devErr);
        // Retry with realestate schema if public fails with 'column name does not exist' or table not found
        if (devErr.code === 'PGRST204' || devErr.code === '42703') {
           console.log(`[SeedService] Retrying ${dev.name} with 'realestate' schema...`);
           const { data: retryData, error: retryErr } = await supabase
             .schema('realestate')
             .from('developers')
             .upsert(payload)
             .select();
           if (retryErr) console.error(`[SeedService] Retry failed for ${dev.name}:`, retryErr);
           else console.log(`[SeedService] Seeded developer (retry): ${dev.name}`);
        }
      } else {
        console.log(`[SeedService] Seeded developer: ${dev.name}`);
      }
    }

    // 2. Seed Projects
    for (const project of MOCK_PROJECTS) {
      const payload = {
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
      };

      const { data, error: projErr } = await supabase
        .from('projects')
        .upsert(payload)
        .select();

      if (projErr) {
        console.error(`[SeedService] Error seeding project ${project.name}:`, projErr);
        if (projErr.code === 'PGRST204' || projErr.code === '42703') {
           console.log(`[SeedService] Retrying project ${project.name} with 'realestate' schema...`);
           const { error: retryErr } = await supabase
             .schema('realestate')
             .from('projects')
             .upsert(payload)
             .select();
           if (retryErr) console.error(`[SeedService] Retry failed for ${project.name}:`, retryErr);
           else console.log(`[SeedService] Seeded project (retry): ${project.name}`);
        }
      } else {
        console.log(`[SeedService] Seeded project: ${project.name}`);
      }
    }

    console.log('[SeedService] Seeding process complete.');
  }
}
