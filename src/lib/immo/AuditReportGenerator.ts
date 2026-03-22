import { Project, ImmoReview } from '@/types/immo';

export interface AuditReport {
  generatedAt: string;
  project: {
    name: string;
    developer: string;
    location: string;
    status: string;
  };
  scoreSummary: {
    global: number;
    trust: number;
    investment: number;
    location: number;
  };
  metrics: {
    verifiedReviewsCount: number;
    constructionProgress: number;
    predictedDelayMonths: number;
    activeDisputes: number;
  };
  expertConsensus: string;
}

export class AuditReportGenerator {
  /**
   * Compiles all project intelligence into a structured audit report.
   * This data can then be rendered as PDF on the client side.
   */
  static generateProjectReport(project: Project, reviews: ImmoReview[]): AuditReport {
    const activeDisputes = reviews.filter(r => r.disputeDetails && (r.disputeDetails.status === 'open' || r.disputeDetails.status === 'pending')).length;
    
    return {
      generatedAt: new Date().toISOString(),
      project: {
        name: project.name,
        developer: project.developerId,
        location: `${project.district}, ${project.city}`,
        status: project.status
      },
      scoreSummary: {
        global: project.audit.trustScore,
        trust: project.audit.trustScore,
        investment: project.audit.trustScore * 0.9,
        location: 8.5 // Fallback value
      },
      metrics: {
        verifiedReviewsCount: reviews.filter(r => r.moderationStatus === 'published').length,
        constructionProgress: project.constructionProgress || 0,
        predictedDelayMonths: project.predictedDelayMonths || 0,
        activeDisputes
      },
      expertConsensus: activeDisputes > 2 
        ? "ALERTE: Consensus négatif. Risques de litiges non résolus."
        : "AUDIT FAVORABLE: Données cohérentes et conformes."
    };
  }

  /**
   * Simulated PDF Export (returns JSON for now, but UI will handle binary blob)
   */
  static async exportToPDF(report: AuditReport): Promise<string> {
    console.log(`[AuditReportGenerator] Generating PDF Blob for ${report.project.name}...`);
    // Conversion logic from HTML/JSON to PDF would happen here
    return `PDF_BLOB_ID_${Date.now()}`;
  }
}
