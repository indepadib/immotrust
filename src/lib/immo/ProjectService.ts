import { supabase } from '@/lib/supabase/client';
import { Project, Developer } from '@/types/immo';

export class ProjectService {
  /**
   * Fetches top-rated audited projects for the homepage.
   */
  static async getFeaturedProjects(limit = 3): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          developer:developer_id (*)
        `)
        .eq('audit_status', 'verified')
        .order('trust_score', { ascending: false })
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
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          developer:developer_id (*)
        `)
        .ilike('city', city)
        .order('trust_score', { ascending: false });

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
      const { data, error } = await supabase
        .from('projects')
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
   * Fetches all projects with basic filtering.
   */
  static async getAllProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          developer:developer_id (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[ProjectService] Error fetching projects:', error);
        return [];
      }

      return (data || []).map(this.mapDbProjectToInterface);
    } catch (err) {
      console.error('[ProjectService] Fatal error in getAllProjects:', err);
      return [];
    }
  }

  /**
   * Fetches top-level stats for the landing page.
   */
  static async getGlobalStats() {
    try {
      const { count: projectCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      const { data: cities } = await supabase
        .from('projects')
        .select('city');
      
      const uniqueCities = new Set((cities || []).map(p => p.city)).size;

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
   * Maps Database snake_case to Frontend camelCase
   */
  public static mapDbProjectToInterface(dbProject: any): Project {
    return {
      id: dbProject.id,
      developerId: dbProject.developer?.company?.name || dbProject.developer_id,
      name: dbProject.name,
      slug: dbProject.slug,
      city: dbProject.city,
      district: dbProject.district,
      address: dbProject.address,
      latitude: dbProject.latitude,
      longitude: dbProject.longitude,
      projectType: dbProject.project_type,
      status: dbProject.status,
      images: dbProject.image_urls || [],
      dates: {
        launch: dbProject.launch_date,
        deliveryProjected: dbProject.expected_delivery_date,
        deliveryActual: dbProject.actual_delivery_date,
      },
      prices: {
        min: dbProject.min_price_mad,
        max: dbProject.max_price_mad,
        avgSqm: dbProject.price_per_m2_mad,
      },
      stats: {
        unitsCount: dbProject.units_count,
        soldPercentage: dbProject.sold_percentage,
      },
      audit: {
        status: dbProject.audit_status,
        trustScore: dbProject.trust_score,
        trustScoreBreakdown: dbProject.metadata?.trustScoreBreakdown,
      },
      constructionProgress: dbProject.construction_progress,
      predictedDelayMonths: dbProject.metadata?.predictedDelayMonths || 0,
      dataConfidenceLevel: dbProject.metadata?.confidenceLevel || 95,
      standing: dbProject.standing || dbProject.metadata?.standing || 'moyen',
    };
  }
}
