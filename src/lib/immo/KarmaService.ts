import { supabase } from '@/lib/supabase/client';
import { Expert } from '@/components/immo/CommunityLeaderboard';

export class KarmaService {
  /**
   * Fetches the top experts based on Karma points.
   */
  static async getTopExperts(limit: number = 5): Promise<Expert[]> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, full_name, karma_points, review_count, badge_title, avatar_url')
      .order('karma_points', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching experts:', error);
      return this.getMockExperts();
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((profile, i) => ({
      id: profile.id,
      name: profile.full_name || 'Expert Anonyme',
      score: profile.karma_points,
      reviews: profile.review_count,
      badge: profile.badge_title || this.getBadgeForScore(profile.karma_points),
      avatar: (profile.full_name || 'E')[0].toUpperCase(),
    }));
  }

  private static getBadgeForScore(score: number): string {
    if (score >= 5000) return 'Légendaire';
    if (score >= 1000) return 'Sénior';
    if (score >= 200) return 'Vérifié';
    return 'Novice';
  }

  private static getMockExperts(): Expert[] {
    return [
      { id: 1, name: 'Karim B.', score: 5200, reviews: 45, badge: 'Légendaire', avatar: 'KB' },
      { id: 2, name: 'Sarah L.', score: 1250, reviews: 32, badge: 'Sénior', avatar: 'SL' },
      { id: 3, name: 'Omar T.', score: 420, reviews: 28, badge: 'Vérifié', avatar: 'OT' },
    ];
  }
}
