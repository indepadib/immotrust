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
   * Calculates a detailed trust score breakdown.
   */
  static calculateProjectScore(project: Project, reviews: ImmoReview[]): number {
    const { finalScore, breakdown } = this.calculateDetailedScore(project, reviews);
    project.audit.trustScoreBreakdown = breakdown;
    return finalScore;
  }

  static calculateDetailedScore(project: Project, reviews: ImmoReview[]) {
    const breakdown = this.calculateBreakdown(project, reviews);
    
    const finalScore = 
      (breakdown.factual * 0.4) + 
      (breakdown.sentiment * 0.3) + 
      (breakdown.audit * 0.2) + 
      (breakdown.risk * 0.1);

    return { 
      finalScore: Math.max(1, Math.min(10, finalScore)),
      breakdown 
    };
  }

  public static calculateBreakdown(project: Project, reviews: ImmoReview[]) {
    // 1. Factual (Price & Delay)
    let factual = 7.5; // Baseline
    if (project.prices.avgSqm > 0) {
      // Heuristic: lower than 25k in Casabalanca is "good value"
      factual = project.prices.avgSqm < 22000 ? 9 : 7;
    }
    if ((project.predictedDelayMonths || 0) > 3) factual -= 1.5;

    // 2. Sentiment (Weighted Reviews)
    let sentiment = 7.0; // Benchmark
    if (reviews.length > 0) {
      let totalWeightedRating = 0;
      let totalWeight = 0;

      reviews.forEach(r => {
        // Base weight: 1.0
        // Verified Purchase: 2.0
        // Expert Reviewer: 1.5 multiplier
        let weight = r.purchaseVerified ? 2.0 : 1.0;
        if (r.reviewerType === 'expert' || r.reviewerType === 'moderator') {
          weight *= 1.5;
        }

        totalWeightedRating += r.ratingOverall * weight;
        totalWeight += weight;
      });

      sentiment = totalWeightedRating / totalWeight;
    }

    // 3. Audit (Compliance)
    const audit = project.audit.status === 'verified' ? 9.5 : 6.0;

    // 4. Risk (Progress)
    let risk = 8.0;
    if (project.status === 'construction' && (project.constructionProgress || 0) < 20) {
      risk = 5.5; // High early-stage risk
    }

    return { factual, sentiment, audit, risk };
  }
}
