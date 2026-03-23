import { supabase } from '@/lib/supabase/client';
import { Project, Developer } from '@/types/immo';

export class ProjectService {
  /**
   * Fetches top-rated audited projects for the homepage.
   */
  static async getFeaturedProjects(limit = 3): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        developer:developer_id (
          *,
          company:company_id (*)
        )
      `)
      .eq('audit_status', 'verified')
      .order('trust_score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[ProjectService] Error fetching featured projects:', error);
      return [];
    }

    return (data || []).map(this.mapDbProjectToInterface);
  }

  /**
   * Fetches a single project by ID or Slug.
   */
  static async getProjectById(idOrSlug: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        developer:developer_id (
          *,
          company:company_id (*)
        )
      `)
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .single();

    if (error) {
      console.error(`[ProjectService] Error fetching project ${idOrSlug}:`, error);
      return null;
    }

    return this.mapDbProjectToInterface(data);
  }

  /**
   * Fetches all projects with basic filtering.
   */
  static async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        developer:developer_id (
          *,
          company:company_id (*)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[ProjectService] Error fetching projects:', error);
      return [];
    }

    return (data || []).map(this.mapDbProjectToInterface);
  }

  /**
   * Maps Database snake_case to Frontend camelCase
   */
  private static mapDbProjectToInterface(dbProject: any): Project {
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
    };
  }
}
