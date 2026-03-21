import { Project, Developer, ImmoReview } from '@/types/immo';

export class ScoreEngine {
  /**
   * Calculates the Trust Score of a project based on internal logic.
   * 40% Factual (Delays, Permits)
   * 30% Reputation (Reviews)
   * 20% Audit (Documentary)
   * 10% Market Risk
   */
  static calculateProjectTrustScore(project: Project, reviews: ImmoReview[]): number {
    let score = 0;
    
    // 1. Factual Stability (Projected vs Observed)
    const delayPenalty = project.status === 'delivered' ? 0 : 0.5; // Simplified
    score += (8 - delayPenalty) * 0.4;

    // 2. Verified Reviews
    if (reviews.length > 0) {
      const avgReview = reviews.reduce((acc, r) => acc + r.ratings.global, 0) / reviews.length;
      score += avgReview * 0.3;
    } else {
      score += 5 * 0.3; // Neutral baseline
    }

    // 3. Data Confidence
    score += (project.dataConfidenceLevel / 10) * 0.2;

    // 4. Market Tension
    score += 7 * 0.1; // Baseline for Casablanca CFC

    return Math.round(score * 10) / 10;
  }

  static calculateRiskFactor(project: Project, developer: Developer): { level: 'low' | 'medium' | 'high', score: number, reasons: string[] } {
    let riskScore = 0;
    const reasons: string[] = [];

    // 1. Delivery History Risk
    if (developer.stats.avgDelayMonths > 6) {
      riskScore += 40;
      reasons.push("Historique de retard important chez le promoteur (>6 mois).");
    }

    // 2. Status Risk
    if (project.status === 'planning') {
      riskScore += 30;
      reasons.push("Projet en phase de planification (Risque de modification des plans).");
    }

    // 3. Data Confidence Risk
    if (project.dataConfidenceLevel < 60) {
      riskScore += 20;
      reasons.push("Niveau de données vérifiées faible.");
    }

    const level = riskScore > 60 ? 'high' : riskScore > 30 ? 'medium' : 'low';
    return { level, score: riskScore, reasons };
  }

  static calculateInvestmentScore(project: Project): number {
    // Rendement vs Risque
    const yieldScore = (project.prices.sqmObserved || 0) > (project.prices.sqmLaunch || 0) ? 8 : 6;
    return yieldScore;
  }

  /**
   * Predictive Model: Estimates the likely delay based on developer track record and project complexity.
   */
  static predictDelayMonths(project: Project, developer: Developer): number {
    let predictedDelay = developer.stats.avgDelayMonths;
    if (project.stats.unitsCount > 500) predictedDelay += 3;
    if (project.location.marketTension > 8) predictedDelay += 2;
    if (project.dataConfidenceLevel < 50) predictedDelay += 4;
    return Math.round(predictedDelay);
  }
}
