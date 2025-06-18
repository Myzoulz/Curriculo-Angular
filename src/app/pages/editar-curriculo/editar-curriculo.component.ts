import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { DefaultSelectComponent } from '../../components/default-select/default-select.component';
import { DefaultCompetenciasListComponent } from '../../components/default-competencias-list/default-competencias-list.component';
import { CurriculoService } from '../../services/curriculo.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curriculo } from '../../models/curriculo';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-editar-curriculo',
  templateUrl: './editar-curriculo.component.html',
  styleUrl: './editar-curriculo.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    DefaultCompetenciasListComponent,
  ],
})
export class EditarCurriculoComponent implements OnInit {
  form!: FormGroup;
  escolaridadeOptions = [
    'Analfabeto',
    'Fundamental Completo',
    'Médio Incompleto',
    'Médio Completo',
    'Superior Incompleto',
    'Superior Completo',
    'Mestrado',
    'Doutorado',
    'Ignorado',
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private curriculoService: CurriculoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      escolaridade: ['', Validators.required],
      funcao: ['', Validators.required],
      competencias: new FormArray([]),
    });

    this.curriculoService.getMeuCurriculo().subscribe({
      next: (curriculo: Curriculo) => {
        let dataNascimento = '';
        if (
          curriculo.dataNascimento &&
          typeof curriculo.dataNascimento === 'string'
        ) {
          dataNascimento = curriculo.dataNascimento.slice(0, 10);
        }
        this.form.patchValue({
          id: curriculo.id,
          nome: curriculo.nome ?? '',
          dataNascimento: dataNascimento ?? '',
          telefone: curriculo.telefone ?? '',
          escolaridade: curriculo.escolaridade ?? '',
          funcao: curriculo.funcao ?? '',
        });

        const competenciasArray = this.form.get('competencias') as FormArray;
        competenciasArray.clear();
        curriculo.competencias.forEach((comp: any) => {
          competenciasArray.push(
            this.fb.group({
              descricao: [comp.descricao, Validators.required],
              nivel: [comp.nivel, Validators.required],
            })
          );
        });

        this.userService.getUsuario().subscribe({
          next: (usuario: Usuario) => {
            this.form.patchValue({
              cpf: usuario.cpf,
              email: usuario.email,
            });
            this.form.get('cpf')?.disable();
          },
        });
      },
      error: (err) => {
        this.toastr.error('Erro ao buscar currículo!');
      },
    });
  }

  get competencias() {
    return this.form.get('competencias') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      const curriculo = this.form.getRawValue();
      this.curriculoService.atualizarCurriculo(curriculo).subscribe({
        next: () => {
          this.toastr.success('Currículo atualizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error('Erro ao atualizar currículo!');
        },
      });
    }
  }
}
