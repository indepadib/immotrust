import { Project, MarketStats } from '@/types/immo';
import { supabase } from '@/lib/supabase/client';

export abstract class BaseScraper {
  abstract sourceName: string;
  abstract baseUrl: string;

  constructor() {}

  async fetchHtml(url: string): Promise<string> {
    console.log(`[${this.sourceName}] Fetching: ${url}`);
    return ""; 
  }

  abstract parseProject(html: string): Partial<Project>;

  async persist(projectId: string, stats: Partial<MarketStats>) {
    console.log(`[${this.sourceName}] Persisting stats for ${projectId}`);
    const { data, error } = await supabase
      .schema('realestate')
      .from('project_market_stats')
      .insert({
        project_id: projectId,
        observed_at: new Date().toISOString().split('T')[0],
        avg_price_per_m2_mad: stats.avgPricePerM2,
        source_type: this.sourceName,
        source_url: this.baseUrl,
        confidence_score: stats.confidenceScore || 0.8
      });
    
    if (error) throw error;
    return data;
  }

  async run(targetUrl: string, projectId?: string) {
    const html = await this.fetchHtml(targetUrl);
    const data = this.parseProject(html);
    
    if (projectId && data.prices) {
      await this.persist(projectId, {
        avgPricePerM2: data.prices.avgSqm,
        confidenceScore: 0.9
      });
    }

    return data;
  }
}
