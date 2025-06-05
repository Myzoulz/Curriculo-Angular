import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from "../../components/default-login-layout/default-login-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultInputComponent } from "../../components/default-input/default-input.component";
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, DefaultInputComponent],
  providers: [
    LoginService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ){
    this.registerForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  cpf: new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11)
  ])
});
  }

  submit() {
  this.loginService.register(
    this.registerForm.value.cpf,
    this.registerForm.value.email,
    this.registerForm.value.password
  ).subscribe({
    next: () => this.toastr.success("Cadastro realizado com sucesso!"),
    error: () => this.toastr.error("Erro ao cadastrar!")
  })
}

  navigate() {
    this.router.navigate(['/login']);
  }

}
