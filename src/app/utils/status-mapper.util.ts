export type CurriculoStatus = 'enviado' | 'analise' | 'aprovado' | 'reprovado' | 'sem-curriculo';

export function mapBackendStatus(status: string): CurriculoStatus {
  if (!status || status.trim().toLowerCase() === 'sem currículo') return 'sem-curriculo';
  switch (status.trim().toLowerCase()) {
    case 'aguardando':
    case 'enviado':
      return 'enviado';
    case 'analise':
      return 'analise';
    case 'aprovado':
      return 'aprovado';
    case 'reprovado':
      return 'reprovado';
    default:
      return 'sem-curriculo';
  }
}
