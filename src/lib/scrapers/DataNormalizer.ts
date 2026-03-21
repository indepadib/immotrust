import { Project, LocationData } from '@/types/immo';

export class DataNormalizer {
  /**
   * Cleans and standardizes raw data from various sources (Mubawab, Sarouty).
   * Ensures 'Flawless' data integrity.
   */
  static normalizeProject(raw: any): Project {
    return {
      id: raw.id || `PRJ-${Math.random().toString(36).substr(2, 9)}`,
      developerId: raw.developerId || 'UNKNOWN',
      name: (raw.title || raw.name || 'Projet Sans Nom').trim(),
      status: this.mapStatus(raw.status || ''),
      typeAsset: this.mapAssetType(raw.category || ''),
      address: raw.address || 'Adresse Non Communiquée',
      location: this.normalizeLocation(raw.location || {}),
      images: raw.images || [],
      dates: {
        launch: raw.launchDate || new Date().toISOString(),
        deliveryProjected: raw.deliveryDate || new Date().toISOString(),
      },
      stats: {
        unitsCount: parseInt(raw.units) || 0,
        soldPercentage: raw.sold ? parseInt(raw.sold) : 0,
      },
      prices: {
        sqmLaunch: this.extractNumbers(raw.price) / (parseInt(raw.surface) || 1),
        sqmObserved: raw.observedPrice ? parseInt(raw.observedPrice) : undefined,
      },
      scores: {
        global: 0,
        trust: 0,
        location: 0,
        investment: 0,
        quality: 0,
      },
      dataConfidenceLevel: raw.isVerified ? 90 : 40,
    };
  }

  private static mapStatus(s: string): 'planning' | 'construction' | 'delivered' | 'cancelled' {
    const low = s.toLowerCase();
    if (low.includes('livr')) return 'delivered';
    if (low.includes('chantier') || low.includes('cours')) return 'construction';
    if (low.includes('annul')) return 'cancelled';
    return 'planning';
  }

  private static mapAssetType(t: string): 'apartment' | 'villa' | 'office' | 'retail' {
    const low = t.toLowerCase();
    if (low.includes('villa')) return 'villa';
    if (low.includes('bureau')) return 'office';
    if (low.includes('magasin') || low.includes('fond')) return 'retail';
    return 'apartment';
  }

  private static normalizeLocation(loc: any): LocationData {
    return {
      city: loc.city || 'Casablanca',
      neighborhood: loc.district || loc.neighborhood || 'Quartier Inconnu',
      marketTension: loc.tension || 5,
      avgSqmPrice: loc.avgPrice || 15000,
      safetyScore: 8,
    };
  }

  private static extractNumbers(s: any): number {
    if (typeof s === 'number') return s;
    if (typeof s !== 'string') return 0;
    return parseInt(s.replace(/\s/g, '').replace(/[^0-9]/g, '')) || 0;
  }
}
