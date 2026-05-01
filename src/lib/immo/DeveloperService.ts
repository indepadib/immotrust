import { supabase } from '@/lib/supabase/client';
import { Project, Developer } from '@/types/immo';
import { ProjectService } from './ProjectService';

export class DeveloperService {
  /**
   * Fetches all projects associated with a specific developer.
   */
  static async getProjectsByDeveloper(developerId: string): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          developer:developer_id (*)
        `)
        .eq('developer_id', developerId);

      if (error) {
        console.error(`[DeveloperService] Error fetching projects for developer ${developerId}:`, error);
        return [];
      }

      // Reuse mapping logic from ProjectService
      return (data || []).map(p => (ProjectService as any).mapDbProjectToInterface(p));
    } catch (err) {
      console.error(`[DeveloperService] Fatal error in getProjectsByDeveloper for ${developerId}:`, err);
      return [];
    }
  }
  /**
   * Fetches all developers with their associated company data.
   */
  static async getAllDevelopers(): Promise<Developer[]> {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select(`
          *,
          company:company_id (*)
        `)
        .order('reputation_score', { ascending: false });

      if (error) {
        console.error('[DeveloperService] Error fetching developers:', error);
        return [];
      }

      return (data || []).map(this.mapDbDeveloperToInterface);
    } catch (err) {
      console.error('[DeveloperService] Fatal error in getAllDevelopers:', err);
      return [];
    }
  }

  /**
   * Fetches a single developer by ID.
   */
  static async getDeveloperById(id: string): Promise<Developer | null> {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select(`
          *
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error(`[DeveloperService] Error fetching developer ${id}:`, error);
        return null;
      }

      return this.mapDbDeveloperToInterface(data);
    } catch (err) {
      console.error(`[DeveloperService] Fatal error in getDeveloperById for ${id}:`, err);
      return null;
    }
  }

  /**
   * Maps Database flat/snake_case structure to Frontend camelCase Interface
   */
  private static mapDbDeveloperToInterface(dbDev: any): Developer {
    return {
      id: dbDev.id,
      companyId: dbDev.company_id,
      name: dbDev.company?.name || 'Unknown Developer',
      avatar: dbDev.avatar_url || dbDev.company?.logo_url,
      developerType: dbDev.developer_type,
      marketSegment: dbDev.market_segment,
      segment: dbDev.segment,
      stats: {
        projectsCount: dbDev.project_count || 0,
        unitsDelivered: dbDev.units_delivered || 0,
        avgDelayMonths: dbDev.avg_delay_months || 0,
        ratingCount: dbDev.review_count || 0,
      },
      scores: {
        reputation: dbDev.reputation_score || 0,
        quality: dbDev.quality_score || 0,
        delays: dbDev.delay_score || 0,
        sav: dbDev.aftersales_score || 0,
      }
    };
  }
}
