import { supabase } from '@/lib/supabase/client';
import { Project, Developer } from '@/types/immo';
import { ProjectService } from './ProjectService';

export class DeveloperService {
  /**
   * Safe query wrapper that tries public schema first, then realestate.
   * Handles PGRST204 (Column not found) and PGRST205 (Table not found).
   */
  private static async safeQuery(tableName: string) {
    const { error } = await supabase.from(tableName).select('*').limit(0);
    if (error && (error.code === 'PGRST204' || error.code === 'PGRST205' || error.code === '42703')) {
      return supabase.schema('realestate').from(tableName);
    }
    return supabase.from(tableName);
  }

  /**
   * Fetches all projects associated with a specific developer.
   */
  static async getProjectsByDeveloper(developerId: string): Promise<Project[]> {
    try {
      const query = await this.safeQuery('developers');
      const { data, error } = await query
        .select(`
          projects (*)
        `)
        .eq('id', developerId)
        .single();

      if (error) {
        console.error(`[DeveloperService] Error fetching projects for developer ${developerId}:`, error);
        return [];
      }

      return (data.projects || []).map((p: any) => ProjectService.mapDbProjectToInterface(p));
    } catch (err) {
      console.error(`[DeveloperService] Fatal error in getProjectsByDeveloper for ${developerId}:`, err);
      return [];
    }
  }

  /**
   * Fetches all developers.
   */
  static async getAllDevelopers(): Promise<Developer[]> {
    try {
      const query = await this.safeQuery('developers');
      const { data, error } = await query
        .select('*')
        .order('name', { ascending: true });

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
      const query = await this.safeQuery('developers');
      const { data, error } = await query
        .select('*')
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
   * Maps Database flat/snake_case structure to Frontend camelCase Interface.
   */
  public static mapDbDeveloperToInterface(dbDev: any): Developer {
    const stats = dbDev.stats || {};
    const scores = dbDev.scores || {};
    const name = dbDev.name || 'Promoteur Certifié';

    return {
      id: dbDev.id,
      name: name,
      avatar: dbDev.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D4AF37&color=fff`,
      developerType: 'Promoteur Immobilier',
      marketSegment: dbDev.segment || 'Standard',
      segment: dbDev.segment || 'Standard',
      stats: {
        projectsCount: stats.projectsCount || 0,
        unitsDelivered: stats.unitsDelivered || 0,
        avgDelayMonths: stats.avgDelayMonths || 0,
        ratingCount: stats.ratingCount || 0,
      },
      scores: {
        reputation: scores.reputation || 0,
        quality: scores.quality || 0,
        delays: scores.delays || 0,
        sav: scores.sav || 0,
      }
    };
  }
}
