import { Component } from '@angular/core';
import { Curriculo } from '../../models/curriculo';
import { AdminCandidateListComponent } from './admin-candidate-list/admin-candidate-list.component';
import { AdminCandidateDetailComponent } from './admin-candidate-detail/admin-candidate-detail.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adm-page',
  templateUrl: './adm-page.component.html',
  styleUrls: ['./adm-page.component.css'],
  standalone: true,
  imports: [
    AdminCandidateListComponent,
    AdminCandidateDetailComponent,
    AdminDashboardComponent,
    CommonModule,
  ],
})
export class AdmPageComponent {
  candidatoSelecionado: Curriculo | null = null;
  atualizarLista = false;

  onSelecionarCandidato(candidato: Curriculo) {
    this.candidatoSelecionado = candidato;
  }

  onAtualizarCandidato() {
    this.atualizarLista = !this.atualizarLista;
  }
}
