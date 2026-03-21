import { ImmoReview } from '@/types/immo';

export interface ModerationFlag {
  type: 'sentiment_mismatch' | 'duplicate_pattern' | 'shill_suspicion' | 'low_evidence';
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export class AutoModerator {
  /**
   * Performs an automated 'First Pass' on a review to flag potential issues.
   * This is the AI Layer of the Trust Infrastructure.
   */
  static screenReview(review: ImmoReview): ModerationFlag[] {
    const flags: ModerationFlag[] = [];

    // 1. Sentiment Mismatch (Mock logic)
    if (review.ratings.global >= 8 && review.commentRaw.toLowerCase().includes('mauvais')) {
      flags.push({
        type: 'sentiment_mismatch',
        severity: 'high',
        message: "Note élevée mais commentaire négatif détecté."
      });
    }

    // 2. Shill Suspicion (Reviews with no proof and too many adjectives)
    const hypeWords = ['incroyable', 'meilleur', 'parfait', 'magnifique', 'top'];
    const hypeCount = hypeWords.filter(word => review.commentRaw.toLowerCase().includes(word)).length;
    if (hypeCount >= 3 && review.verificationLevel === 'none') {
      flags.push({
        type: 'shill_suspicion',
        severity: 'medium',
        message: "Suspicion de 'Shilling' (trop d'adjectifs sans preuve jointe)."
      });
    }

    // 3. Short Review Flag
    if (review.commentRaw.length < 20) {
      flags.push({
        type: 'low_evidence',
        severity: 'low',
        message: "Commentaire trop court pour être utile."
      });
    }

    return flags;
  }
}
