import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Curriculo } from '../../../models/curriculo';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-candidate-detail',
  templateUrl: './admin-candidate-detail.component.html',
  styleUrl: './admin-candidate-detail.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AdminCandidateDetailComponent {
  @Input() candidato: Curriculo | null = null;

  constructor(private adminService: AdminService) {}

  @Output() atualizado = new EventEmitter<void>();

  aprovar() {
    if (!this.candidato) return;
    this.adminService.aprovarCurriculo(this.candidato.id!).subscribe(() => {
      this.candidato!.status = 'aprovado';
      this.atualizado.emit();
    });
  }

  reprovar() {
    if (!this.candidato) return;
    this.adminService.reprovarCurriculo(this.candidato.id!).subscribe(() => {
      this.candidato!.status = 'reprovado';
      this.atualizado.emit();
    });
  }
}
