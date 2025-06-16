import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultHomeUserLayoutComponent } from "../../components/default-home-user-layout/default-home-user-layout.component";
import { CurriculoService } from '../../services/curriculo.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [DefaultHomeUserLayoutComponent]
})
export class HomeComponent implements OnInit {
  username = sessionStorage.getItem('username') || 'Usuário';
  curriculoStatus: 'enviado' | 'analise' | 'aprovado' | 'reprovado' | null = null;

  constructor(
    private router: Router,
    private curriculoService: CurriculoService,
  ) {}

  ngOnInit() {
    this.curriculoService.getStatusCurriculo().subscribe({
      next: (status) => {
        this.curriculoStatus = status;
      },
      error: () => {
        this.curriculoStatus = null;
      }
    });
  }

  onCadastrarCurriculo() {
    this.router.navigate(['/cadastro']);
  }

  onEditarCurriculo() {
    this.router.navigate(['/editar']);
  }
}
