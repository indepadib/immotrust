import { ExpertProfile, User } from '@/types/user';
import { ImmoReview, Project } from '@/types/immo';

export class KarmaEngine {
  /**
   * Calculates the weight of a review based on the reviewer's karma and verification level.
   * A 'Verified Expert' review peters significantly more than a standard user.
   */
  static calculateReviewWeight(user: User, review: ImmoReview): number {
    let weight = 1.0;

    // 1. Role Multiplier
    if (user.role === 'expert') weight *= 2.5;
    if (user.role === 'admin') weight *= 5.0;

    // 2. Karma Bonus (Logarithmic scaling to avoid runaway power)
    const karmaBonus = Math.log10(user.karma + 1) * 0.5;
    weight += karmaBonus;

    // 3. Verification Level
    if (review.verificationLevel === 'proof_verified') weight *= 2.0;
    if (review.verificationLevel === 'none') weight *= 0.5;

    return Math.round(weight * 10) / 10;
  }

  /**
   * Updates an Expert's Karma based on the quality of their contributions.
   * Logic: Points for verified reviews, more points if the community agrees.
   */
  static awardKarma(userId: string, action: 'review_approved' | 'proof_verified' | 'expert_vote'): number {
    const rewards = {
      review_approved: 10,
      proof_verified: 50,
      expert_vote: 5
    };
    const amount = rewards[action] || 0;
    console.log(`[KarmaEngine] Awarding ${amount} karma to user ${userId} for ${action}`);
    return amount;
  }

  /**
   * Finalizes an audit after expert consensus.
   */
  static finalizeAudit(reviewId: string, status: 'verified' | 'rejected') {
     console.log(`[KarmaEngine] Finalizing audit ${reviewId} with status ${status}`);
     // Trigger points distribution
  }
}
