import { MubawabScraper } from './scrapers/MubawabScraper';
import { DataNormalizer } from './scrapers/DataNormalizer';
import { ScoreEngine } from './immo/ScoreEngine';
import { supabase } from './supabase/client';

export class SyncService {
  /**
   * Orchestrates the sync between external sources and the internal trust database.
   * This is the 'Conveyor Belt' of the trust infrastructure.
   */
  static async syncProject(url: string) {
    console.log(`[SyncService] Starting sync for: ${url}`);
    
    // 1. Scrape
    const scraper = new MubawabScraper();
    const rawData = await scraper.run(url);

    // 2. Normalize
    const cleanData = DataNormalizer.normalizeProject(rawData);

    // 3. Score
    const finalScore = ScoreEngine.calculateProjectTrustScore(cleanData, []);
    cleanData.scores.trust = finalScore;

    // 4. Persist (Mock Supabase call)
    console.log(`[SyncService] Persisting updated project: ${cleanData.name} with Trust Score: ${finalScore}`);
    
    // In real life: 
    // await supabase.from('projects').upsert(cleanData);

    return cleanData;
  }

  /**
   * Simulates a daily cron job to track price evolution.
   */
  static async trackMarketEvolution() {
     console.log("[SyncService] Tracking market-wide price evolution...");
     // Logic to snapshot current prices into 'priceHistory'
  }
}
