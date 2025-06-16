import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { CadastroCurriculoComponent } from './pages/cadastro-curriculo/cadastro-curriculo.component';
import { EditarCurriculoComponent } from './pages/editar-curriculo/editar-curriculo.component';
import { AdmPageComponent } from './pages/adm-page/adm-page.component';
import { AdmGuard } from './services/adm-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
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
  },
  {
    path: "editar",
    component: EditarCurriculoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    component: AdmPageComponent,
    canActivate: [AdmGuard]
  }
];
