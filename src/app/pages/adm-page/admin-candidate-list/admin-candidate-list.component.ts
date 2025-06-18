import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Curriculo } from '../../../models/curriculo';
import { AdminService } from '../../../services/admin.service';
import { Page } from '../../../models/page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-candidate-list',
  templateUrl: './admin-candidate-list.component.html',
  styleUrl: './admin-candidate-list.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class AdminCandidateListComponent implements OnInit, OnChanges {
  candidatos: Curriculo[] = [];
  paginaAtual = 0;
  totalPaginas = 0;
  tamanhoPagina = 10;

  @Input() atualizar: any;
  @Output() selecionar = new EventEmitter<Curriculo>();

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.carregarPagina(0);
  }

  carregarPagina(pagina: number) {
    this.adminService.getTodosCurriculos(pagina, this.tamanhoPagina).subscribe({
      next: (res: Page<Curriculo>) => {
        this.candidatos = res.content;
        this.paginaAtual = res.number;
        this.totalPaginas = res.totalPages;
      },
    });
  }

  onSelecionar(candidato: Curriculo) {
    this.selecionar.emit(candidato);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['atualizar'] && !changes['atualizar'].firstChange) {
      this.carregarPagina(this.paginaAtual);
    }
  }
}
