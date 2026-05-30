import { User } from '@/types/user';
import { ImmoReview } from '@/types/immo';
export type ExpertTier = 'novice' | 'verified' | 'senior' | 'legendary';

export class KarmaEngine {
  /**
   * Calculates the weight of a review based on the reviewer's karma and verification level.
   */
  static calculateReviewWeight(user: User, review: ImmoReview): number {
    let weight = 1.0;

    // 1. Role & Tier Multiplier
    if (user.role === 'expert') {
      const tier = this.getExpertTier(user.karma);
      if (tier === 'verified') weight *= 2.5;
      if (tier === 'senior') weight *= 4.0;
      if (tier === 'legendary') weight *= 7.0;
    }
    
    if (user.role === 'admin') weight *= 10.0;

    // 2. Karma Bonus
    const karmaBonus = Math.log10(user.karma + 1) * 0.5;
    weight += karmaBonus;

    // 3. Verification Level
    if (review.purchaseVerified) weight *= 2.0;

    return Math.round(weight * 10) / 10;
  }

  static getExpertTier(karma: number): ExpertTier {
    if (karma >= 5000) return 'legendary';
    if (karma >= 1000) return 'senior';
    if (karma >= 200) return 'verified';
    return 'novice';
  }

  static awardKarma(userId: string, action: 'review_approved' | 'proof_verified' | 'expert_vote'): number {
    const rewards = {
      review_approved: 20,
      proof_verified: 100,
      expert_vote: 5
    };
    return rewards[action] || 0;
  }
}
