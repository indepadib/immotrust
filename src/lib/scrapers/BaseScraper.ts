import { Project } from '@/types/immo';

export abstract class BaseScraper {
  abstract sourceName: string;
  abstract baseUrl: string;

  constructor() {}

  async fetchHtml(url: string): Promise<string> {
    console.log(`[${this.sourceName}] Fetching: ${url}`);
    // In a real env, use fetch() or a proxy
    return ""; 
  }

  abstract parseProject(html: string): Partial<Project>;

  async run(targetUrl: string) {
    const html = await this.fetchHtml(targetUrl);
    const data = this.parseProject(html);
    console.log(`[${this.sourceName}] Scraped data:`, data);
    return data;
  }
}
