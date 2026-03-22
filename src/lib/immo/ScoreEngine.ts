import { Developer, ImmoReview, Project } from '@/types/immo';

export class ScoreEngine {
  /**
   * Calculates the Trust Score for a developer.
   * Formula: (Reputation * 0.4) + (Quality * 0.3) + (Sav * 0.3) - (Delay Penalty)
   */
  static calculateDeveloperScore(developer: Developer): number {
    const baseScore = 
      (developer.scores.reputation * 0.4) +
      (developer.scores.quality * 0.3) +
      (developer.scores.sav * 0.3);
    
    // Penalty for delays: -0.5 points per month of average delay
    const delayPenalty = Math.max(0, developer.stats.avgDelayMonths * 0.5);
    
    return Math.max(1, Math.min(10, baseScore - delayPenalty));
  }

  /**
   * Calculates the overall project score.
   */
  static calculateProjectScore(project: Project, reviews: ImmoReview[]): number {
    const avgReviewScore = reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.ratingOverall, 0) / reviews.length
      : 5; // Default middle score if no reviews

    const locationScore = project.audit.status === 'verified' ? 9 : 6;
    
    // Weighting: 40% Developer history, 30% User reviews, 30% Audit status
    const developerHistoryScore = 7.5; // Placeholder for actual developer trust
    
    const finalScore = (developerHistoryScore * 0.4) + (avgReviewScore * 0.3 * 2) + (locationScore * 0.3);
    
    return Math.max(1, Math.min(10, finalScore));
  }
}
