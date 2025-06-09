import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { CadastroCurriculoComponent } from './pages/cadastro-curriculo/cadastro-curriculo.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cadastro",
    component: CadastroCurriculoComponent,
    canActivate: [AuthGuard]
  }
];
