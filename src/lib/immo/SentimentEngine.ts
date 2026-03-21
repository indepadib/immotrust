/**
 * ImmoTrust Sentiment Engine
 * Analyzes market news and reviews for developer-specific risks.
 */
export class SentimentEngine {
  private static readonly KEYWORDS = {
    NEGATIVE: ['retard', 'litige', 'arnaque', 'chantier arrêté', 'problème', 'plainte', 'tribunal'],
    POSITIVE: ['livraison', 'succès', 'qualité', 'finition', 'délais respectés', 'excellence']
  };

  /**
   * Returns a sentiment score from -1 (Extremely Negative) to 1 (Extremely Positive)
   */
  static analyzeText(text: string): number {
    const lower = text.toLowerCase();
    let score = 0;

    this.KEYWORDS.NEGATIVE.forEach(k => {
      if (lower.includes(k)) score -= 0.4;
    });

    this.KEYWORDS.POSITIVE.forEach(k => {
      if (lower.includes(k)) score += 0.3;
    });

    return Math.max(-1, Math.min(1, score));
  }

  static getSentimentLabel(score: number): string {
    if (score < -0.4) return 'Contesté / Risqué';
    if (score > 0.4) return 'Plébiscité';
    return 'Neutre / Stable';
  }
}
