import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultHomeUserLayoutComponent } from "../../components/default-home-user-layout/default-home-user-layout.component";
import { CurriculoService } from '../../services/curriculo.service';
import { UserService } from '../../services/user.service';
import { CurriculoStatus } from '../../utils/status-mapper.util';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [DefaultHomeUserLayoutComponent]
})
export class HomeComponent implements OnInit {
  username = sessionStorage.getItem('username') || 'Usuário';
  curriculoStatus: CurriculoStatus = 'sem-curriculo';

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
        this.curriculoStatus = 'sem-curriculo';
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
