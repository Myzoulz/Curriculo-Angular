import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultHomeUserLayoutComponent } from "../../components/default-home-user-layout/default-home-user-layout.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [DefaultHomeUserLayoutComponent]
})
export class HomeComponent {
  username = sessionStorage.getItem('username') || 'Usuário';
  curriculoStatus: 'aprovado' | 'reprovado' | null = null;

  constructor(private router: Router) {}

  onCadastrarCurriculo() {
    this.router.navigate(['/cadastro']);
  }

  onEditarCurriculo() {
    this.router.navigate(['/curriculo/editar']);
  }
}
