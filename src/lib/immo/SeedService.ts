import { supabase } from '@/lib/supabase/client';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';

export class SeedService {
  /**
   * Seeds the database with the initial mock data.
   * Logic: 
   * 1. Try public schema first.
   * 2. If it fails with PGRST204 (Table not found) or PGRST205 (Column not found) or 42703 (Column not found),
   *    retry with 'realestate' schema.
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

      const { data, error: devErr } = await supabase
        .from('developers')
        .upsert(payload)
        .select();

      if (devErr && (devErr.code === 'PGRST204' || devErr.code === 'PGRST205' || devErr.code === '42703')) {
        console.log(`[SeedService] ${dev.name}: Table/Column not in public. Retrying with 'realestate' schema...`);
        const { error: retryErr } = await supabase
          .schema('realestate')
          .from('developers')
          .upsert(payload)
          .select();
        
        if (retryErr) console.error(`[SeedService] Retry failed for ${dev.name}:`, retryErr);
        else console.log(`[SeedService] Seeded developer (realestate): ${dev.name}`);
      } else if (devErr) {
        console.error(`[SeedService] Error seeding developer ${dev.name}:`, devErr);
      } else {
        console.log(`[SeedService] Seeded developer (public): ${dev.name}`);
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

      if (projErr && (projErr.code === 'PGRST204' || projErr.code === 'PGRST205' || projErr.code === '42703')) {
        console.log(`[SeedService] ${project.name}: Table/Column not in public. Retrying with 'realestate' schema...`);
        const { error: retryErr } = await supabase
          .schema('realestate')
          .from('projects')
          .upsert(payload)
          .select();
        
        if (retryErr) console.error(`[SeedService] Retry failed for ${project.name}:`, retryErr);
        else console.log(`[SeedService] Seeded project (realestate): ${project.name}`);
      } else if (projErr) {
        console.error(`[SeedService] Error seeding project ${project.name}:`, projErr);
      } else {
        console.log(`[SeedService] Seeded project (public): ${project.name}`);
      }
    }

    console.log('[SeedService] Seeding process complete.');
  }
}
