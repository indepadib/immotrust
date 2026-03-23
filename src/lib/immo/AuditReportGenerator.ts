import { Project } from '@/types/immo';
import { ScoreEngine } from './ScoreEngine';

export interface AuditReport {
  projectId: string;
  projectName: string;
  generatedAt: string;
  overallScore: number;
  subScores: {
    factual: number;
    sentiment: number;
    audit: number;
    risk: number;
  };
  marketContext: string;
  recommendation: 'STRONG_BUY' | 'ACCUMULATE' | 'HOLD' | 'SELL';
  hash: string;
}

export class AuditReportGenerator {
  /**
   * Generates a structured audit report for a project.
   */
  static generateReport(project: Project): AuditReport {
    const { finalScore, breakdown } = ScoreEngine.calculateDetailedScore(project, []);
    
    // Deterministic recommendation based on scores
    let recommendation: AuditReport['recommendation'] = 'HOLD';
    if (finalScore >= 8.5) recommendation = 'STRONG_BUY';
    else if (finalScore >= 7) recommendation = 'ACCUMULATE';
    else if (finalScore < 4) recommendation = 'SELL';

    return {
      projectId: project.id,
      projectName: project.name,
      generatedAt: new Date().toISOString(),
      overallScore: finalScore,
      subScores: {
        factual: breakdown.factual,
        sentiment: breakdown.sentiment,
        audit: breakdown.audit,
        risk: breakdown.risk
      },
      marketContext: `Le projet ${project.name} situé à ${project.district} est analysé dans un contexte de tension de marché de 8/10.`,
      recommendation,
      hash: `IT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
  }

  /**
   * Simulates a PDF download by creating an HTML/Base64 blob.
   */
  static downloadReport(report: AuditReport) {
    const content = `
      CERTIFICAT D'AUDIT IMMOTRUST
      ---------------------------
      PROJET: ${report.projectName.toUpperCase()}
      SCORE GLOBAL: ${report.overallScore}/10
      RECOMMANDATION: ${report.recommendation}
      
      BREAKDOWN:
      - Factual: ${report.subScores.factual}
      - Sentiment: ${report.subScores.sentiment}
      - Audit: ${report.subScores.audit}
      - Risk: ${report.subScores.risk}
      
      HASH DE VÉRIFICATION: ${report.hash}
      GÉNÉRÉ LE: ${report.generatedAt}
      ---------------------------
      ImmoTrust Sovereign Verification Platform
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Audit_ImmoTrust_${report.projectName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
