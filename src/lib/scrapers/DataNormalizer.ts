import { Project, ScrapedProject } from '../../types/immo';

export class DataNormalizer {
  private static NEIGHBORHOOD_MAPPING: Record<string, string> = {
    'cfc': 'Casablanca Finance City',
    'anfa': 'Anfa',
    'maarif': 'Maarif',
    'bouskoura': 'Bouskoura',
    'dar bouazza': 'Dar Bouazza',
  };

  static normalizeProject(raw: any): ScrapedProject {
    return this.normalize(raw);
  }

  static normalize(raw: any): ScrapedProject {
    const title = raw.title || 'Projet Sans Titre';
    const priceStr = raw.price || '0';
    const price = parseInt(priceStr.replace(/\D/g, '')) || 0;
    
    const location = raw.location || '';
    const neighborhood = this.detectNeighborhood(location);
    
    const areaStr = raw.area || '0';
    const area = parseInt(areaStr.replace(/\D/g, '')) || 0;
    
    const pricePerMeter = area > 0 ? Math.round(price / area) : 0;

    return {
      id: raw.id || Math.random().toString(36).substr(2, 9),
      title,
      price,
      location,
      neighborhood,
      area,
      pricePerMeter,
      description: raw.description || '',
      images: raw.images || [],
      features: raw.features || [],
      scrapedAt: new Date().toISOString(),
      source: raw.source || 'Unknown',
      status: 'pending'
    };
  }

  private static detectNeighborhood(location: string): string {
    const locLower = location.toLowerCase();
    for (const [key, value] of Object.entries(this.NEIGHBORHOOD_MAPPING)) {
      if (locLower.includes(key)) return value;
    }
    return 'Autre';
  }

  static calculateMarketScore(project: ScrapedProject, categoryAvg: number): number {
    if (categoryAvg === 0) return 70; // Baseline
    
    // Lower price per meter than average = Better score
    const ratio = project.pricePerMeter / categoryAvg;
    if (ratio < 0.8) return 95;
    if (ratio < 1.0) return 85;
    if (ratio < 1.2) return 70;
    return 50;
  }
}
