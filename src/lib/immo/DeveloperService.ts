import { supabase } from '@/lib/supabase/client';
import { Project, Developer } from '@/types/immo';
import { ProjectService } from './ProjectService';
import { MOCK_DEVELOPERS, MOCK_PROJECTS } from '@/data/immoMock';

export class DeveloperService {
  static async getProjectsByDeveloper(developerId: string): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select("projects (*)")
        .eq('id', developerId)
        .single();

      if (error || !data || !data.projects || data.projects.length === 0) {
        // Fallback to mock data if DB fails or is empty
        return MOCK_PROJECTS.filter(p => p.developerId === developerId);
      }

      return data.projects.map((p: any) => ProjectService.mapDbProjectToInterface(p));
    } catch (err) {
      return MOCK_PROJECTS.filter(p => p.developerId === developerId);
    }
  }

  static async getAllDevelopers(): Promise<Developer[]> {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .order('name', { ascending: true });

      if (error || !data || data.length === 0) {
        return MOCK_DEVELOPERS;
      }

      return data.map(this.mapDbDeveloperToInterface);
    } catch (err) {
      return MOCK_DEVELOPERS;
    }
  }

  static async getDeveloperById(id: string): Promise<Developer | null> {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        return MOCK_DEVELOPERS.find(d => d.id === id) || null;
      }

      return this.mapDbDeveloperToInterface(data);
    } catch (err) {
      return MOCK_DEVELOPERS.find(d => d.id === id) || null;
    }
  }

  public static mapDbDeveloperToInterface(dbDev: any): Developer {
    const stats = dbDev.stats || {};
    const scores = dbDev.scores || {};
    const name = dbDev.name || 'Promoteur';

    return {
      id: dbDev.id,
      name: name,
      avatar: dbDev.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=4F46E5&color=fff",
      developerType: 'Promoteur',
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