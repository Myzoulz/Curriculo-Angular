import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-default-home-user-layout',
  imports: [CommonModule, ProgressBarModule],
  templateUrl: './default-home-user-layout.component.html',
  styleUrl: './default-home-user-layout.component.css',
  standalone: true
})
export class DefaultHomeUserLayoutComponent {
  @Input() username: string = '';
  @Input() curriculoStatus: 'enviado' | 'analise' | 'aprovado' | 'reprovado' | null = null;

  @Output() cadastrar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();

  get activeIndex(): number {
  switch (this.curriculoStatus) {
    case null: return 0; // Não enviou ainda
    case 'enviado': return 1;
    case 'analise': return 2;
    case 'aprovado':
    case 'reprovado': return 3;
    default: return 0;
  }
}

get progressValue(): number {
  return (this.activeIndex / 3) * 100;
}

isInProgress(step: number): boolean {
  if (step === 1) return this.curriculoStatus === null;
  if (step === 2) return this.curriculoStatus === 'enviado';
  return false;
}

isComplete(step: number): boolean {
  if (step === 1) return this.activeIndex > 0;
  if (step === 2) return this.activeIndex > 1;
  if (step === 3) return this.activeIndex > 2;
  return false;
}
  get resultadoLabel(): string {
    if (this.curriculoStatus === 'aprovado') return 'Parabéns! Seu currículo foi aprovado.';
    if (this.curriculoStatus === 'reprovado') return 'Seu currículo foi reprovado. Você pode editar e reenviar.';
    if (this.curriculoStatus === 'analise') return 'Seu currículo está em análise.';
    if (this.curriculoStatus === 'enviado') return 'Seu currículo foi enviado e está aguardando análise.';
    return '';
  }
}
