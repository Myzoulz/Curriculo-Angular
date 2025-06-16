export type CurriculoStatus = 'enviado' | 'analise' | 'aprovado' | 'reprovado';

export function mapBackendStatus(status: string): CurriculoStatus | null {
  if (!status || status.trim().toLowerCase() === 'sem currículo') return null;
  switch (status.trim().toLowerCase()) {
    case 'aguardando': return 'enviado';
    case 'aprovado': return 'aprovado';
    case 'reprovado': return 'reprovado';
    default: return null;
  }
}
