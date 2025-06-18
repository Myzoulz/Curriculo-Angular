import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { CurriculoStatus } from '../../../utils/status-mapper.util';

@Component({
  selector: 'app-default-home-user-layout',
  imports: [CommonModule, ProgressBarModule],
  templateUrl: './default-home-user-layout.component.html',
  styleUrl: './default-home-user-layout.component.css',
  standalone: true,
})
export class DefaultHomeUserLayoutComponent {
  @Input() username: string = '';
  @Input() curriculoStatus: CurriculoStatus = 'sem-curriculo';
  @Output() cadastrar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();

  get activeIndex(): number {
    switch (this.curriculoStatus) {
      case 'enviado':
        return 1;
      case 'analise':
        return 2;
      case 'aprovado':
      case 'reprovado':
        return 3;
      case 'sem-curriculo':
      default:
        return 0;
    }
  }

  get progressValue(): number {
    return (this.activeIndex / 3) * 100;
  }

  isInProgress(step: number): boolean {
    if (step === 1) return this.curriculoStatus === 'sem-curriculo';
    if (step === 2) return this.curriculoStatus === 'enviado';
    return false;
  }

  isComplete(step: number): boolean {
    if (step === 1) return this.activeIndex > 0;
    if (step === 2) return this.activeIndex > 1;
    if (step === 3) return this.activeIndex > 2;
    return false;
  }

  statusMessages: Record<CurriculoStatus, string> = {
    enviado: 'Seu currículo foi enviado e está aguardando análise.',
    analise: 'Seu currículo está em análise.',
    aprovado:
      'Parabéns! Seu currículo foi aprovado. Aguarde o próximo contato pelo email cadastrado.',
    reprovado:
      'Infelizmente, esta vez não foi possível prosseguir com a sua candidatura. Agradecemos a sua participação no processo.',
    'sem-curriculo': 'Você ainda não cadastrou seu currículo.',
  };

  get statusMessage(): string {
    return this.statusMessages[this.curriculoStatus];
  }
}
