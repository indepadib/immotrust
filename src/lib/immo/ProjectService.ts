import { supabase } from '@/lib/supabase/client';
import { Project, Developer } from '@/types/immo';

export class ProjectService {
  /**
   * Safe query wrapper that tries public schema first, then realestate.
   */
  private static async safeQuery(tableName: string) {
    const { error } = await supabase.from(tableName).select('*').limit(0);
    // If public table fails or lacks columns, try realestate
    if (error && (error.code === 'PGRST204' || error.code === '42703')) {
      return supabase.schema('realestate').from(tableName);
    }
    return supabase.from(tableName);
  }

  /**
   * Fetches top-rated audited projects.
   */
  static async getFeaturedProjects(limit = 3): Promise<Project[]> {
    try {
      const query = await this.safeQuery('projects');
      const { data, error } = await query
        .select(`
          *,
          developer:developer_id (*)
        `)
        .order('scores->trust', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[ProjectService] Error fetching featured projects:', error);
        return [];
      }

      return (data || []).map(p => this.mapDbProjectToInterface(p));
    } catch (err) {
      console.error('[ProjectService] Fatal error in getFeaturedProjects:', err);
      return [];
    }
  }

  /**
   * Fetches projects by city.
   */
  static async getProjectsByCity(city: string): Promise<Project[]> {
    try {
      const query = await this.safeQuery('projects');
      const { data, error } = await query
        .select(`
          *,
          developer:developer_id (*)
        `)
        .ilike('location->>city', city)
        .order('scores->trust', { ascending: false });

      if (error) {
        console.error(`[ProjectService] Error fetching projects for city ${city}:`, error);
        return [];
      }

      return (data || []).map(p => this.mapDbProjectToInterface(p));
    } catch (err) {
      console.error(`[ProjectService] Fatal error in getProjectsByCity for ${city}:`, err);
      return [];
    }
  }

  /**
   * Fetches a single project by ID or Slug.
   */
  static async getProjectById(idOrSlug: string): Promise<Project | null> {
    try {
      const query = await this.safeQuery('projects');
      const { data, error } = await query
        .select(`
          *,
          developer:developer_id (*)
        `)
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .single();

      if (error) {
        console.error(`[ProjectService] Error fetching project ${idOrSlug}:`, error);
        return null;
      }

      return this.mapDbProjectToInterface(data);
    } catch (err) {
      console.error(`[ProjectService] Fatal error in getProjectById for ${idOrSlug}:`, err);
      return null;
    }
  }

  /**
   * Fetches all projects.
   */
  static async getAllProjects(): Promise<Project[]> {
    try {
      const query = await this.safeQuery('projects');
      const { data, error } = await query
        .select(`
          *,
          developer:developer_id (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[ProjectService] Error fetching projects:', error);
        return [];
      }

      return (data || []).map(p => this.mapDbProjectToInterface(p));
    } catch (err) {
      console.error('[ProjectService] Fatal error in getAllProjects:', err);
      return [];
    }
  }

  /**
   * Fetches top-level stats.
   */
  static async getGlobalStats() {
    try {
      const query = await this.safeQuery('projects');
      const { count: projectCount } = await query
        .select('*', { count: 'exact', head: true });

      const query2 = await this.safeQuery('projects');
      const { data: projects } = await query2
        .select('location');
      
      const uniqueCities = new Set((projects || []).map(p => p.location?.city).filter(Boolean)).size;

      return {
        projectCount: projectCount || 0,
        cityCount: uniqueCities || 0
      };
    } catch (err) {
      console.error('[ProjectService] Fatal error in getGlobalStats:', err);
      return { projectCount: 0, cityCount: 0 };
    }
  }

  /**
   * Maps Database snake_case (JSONB based) to Frontend camelCase.
   */
  public static mapDbProjectToInterface(dbProject: any): Project {
    const dbDev = dbProject.developer || {};
    const loc = dbProject.location || {};
    const scores = dbProject.scores || {};
    const prices = dbProject.prices || {};
    const dates = dbProject.dates || {};
    const stats = dbProject.stats || {};

    return {
      id: dbProject.id,
      developerId: dbProject.developer_id,
      developer: {
        id: dbProject.developer_id,
        name: dbDev.name || 'Promoteur Certifié',
        avatar: dbDev.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(dbDev.name || 'P')}&background=D4AF37&color=fff`,
      },
      name: dbProject.name,
      slug: dbProject.slug || dbProject.name.toLowerCase().replace(/ /g, '-'),
      city: loc.city || 'Maroc',
      district: loc.district || '',
      address: dbProject.address || '',
      projectType: dbProject.type_asset || 'apartment',
      status: dbProject.status || 'planning',
      images: dbProject.images || [],
      dates: {
        launch: dates.launch,
        deliveryProjected: dates.delivery_projected,
        deliveryActual: dates.delivery_actual,
      },
      prices: {
        min: prices.min,
        max: prices.max,
        avgSqm: prices.sqm_observed || prices.sqm_launch || 0,
      },
      stats: {
        unitsCount: stats.units_count,
        soldPercentage: stats.sold_percentage,
      },
      audit: {
        status: 'verified',
        trustScore: scores.trust || 0,
        trustScoreBreakdown: scores,
      },
      constructionProgress: stats.construction_progress || 0,
      predictedDelayMonths: dbProject.metadata?.predictedDelayMonths || 0,
      dataConfidenceLevel: dbProject.data_confidence_level || 95,
      standing: dbProject.metadata?.standing || 'moyen',
      metadata: dbProject.metadata || {}
    };
  }
}
