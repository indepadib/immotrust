import { Project, ImmoReview } from '@/types/immo';
import { ScoreEngine } from './ScoreEngine';

export class RankingWorker {
  /**
   * Periodically recalculates the global ranking of projects.
   * Ensures the 'Institutional Dashboard' always shows the most trusted assets.
   */
  static async updateGlobalRankings(projects: Project[], reviews: ImmoReview[]): Promise<Project[]> {
    console.log('[RankingWorker] Starting global re-scoring...');
    
    const updatedProjects = projects.map(project => {
      const projectReviews = reviews.filter(r => r.projectId === project.id);
      const newScore = ScoreEngine.calculateProjectTrustScore(project, projectReviews);
      
      return {
        ...project,
        scores: {
          ...project.scores,
          trust: newScore,
          global: (newScore + project.scores.investment + project.scores.location) / 3
        }
      };
    });

    // Sort by global score descending
    return updatedProjects.sort((a, b) => b.scores.global - a.scores.global);
  }
}
