import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { DefaultSelectComponent } from '../../components/default-select/default-select.component';
import { DefaultCompetenciasListComponent } from '../../components/default-competencias-list/default-competencias-list.component';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-cadastro-curriculo',
  templateUrl: './cadastro-curriculo.component.html',
  styleUrl: './cadastro-curriculo.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    DefaultCompetenciasListComponent,
  ]
})
export class CadastroCurriculoComponent implements OnInit {
  form!: FormGroup;
  escolaridadeOptions = [
    'Analfabeto', 'Fundamental Completo', 'Médio Incompleto', 'Médio Completo',
    'Superior Incompleto', 'Superior Completo', 'Mestrado', 'Doutorado', 'Ignorado'
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      escolaridade: ['', Validators.required],
      funcao: ['', Validators.required],
      competencias: new FormArray([
        this.fb.group({
          descricao: ['', Validators.required],
          nivel: ['', Validators.required]
        })
      ])
    });

    this.userService.getUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.form.patchValue({
          cpf: usuario.cpf,
          email: usuario.email
        });
        this.form.get('cpf')?.disable();
      }
    });
  }

  get competencias() {
    return this.form.get('competencias') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      const curriculo = this.form.getRawValue();
      this.userService.enviarCurriculo(curriculo).subscribe({
        next: () => {
          this.toastr.success('Currículo enviado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error('Erro ao enviar currículo!');
        }
      });
    }
  }
}
