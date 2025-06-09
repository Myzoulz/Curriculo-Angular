import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { DefaultSelectComponent } from '../../components/default-select/default-select.component';
import { DefaultCompetenciasListComponent } from '../../components/default-competencias-list/default-competencias-list.component';

@Component({
  selector: 'app-cadastro-curriculo',
  templateUrl: './cadastro-curriculo.component.html',
  styleUrl: './cadastro-curriculo.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DefaultInputComponent,
    DefaultSelectComponent,
    DefaultCompetenciasListComponent
  ]
})
export class CadastroCurriculoComponent implements OnInit {
  form!: FormGroup;
  escolaridadeOptions = [
    'Analfabeto', 'Fundamental Completo', 'Médio Incompleto', 'Médio Completo',
    'Superior Incompleto', 'Superior Completo', 'Mestrado', 'Doutorado', 'Ignorado'
  ];

  ngOnInit() {
  const email = sessionStorage.getItem('username') || '';
  const cpf = sessionStorage.getItem('cpf') || '';

  this.form = new FormBuilder().group({
    nome: ['', Validators.required],
    cpf: [{ value: cpf, disabled: true }, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    dataNascimento: ['', Validators.required],
    email: [{ value: email, disabled: true }, [Validators.required, Validators.email]],
    telefone: ['', Validators.required],
    escolaridade: ['', Validators.required],
    funcao: ['', Validators.required],
    competencias: new FormArray([
      new FormBuilder().group({
        descricao: ['', Validators.required],
        nivel: ['', Validators.required]
      })
    ])
  });
}

  get competencias() {
    return this.form.get('competencias') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      // Use getRawValue() para pegar campos desabilitados
      console.log(this.form.getRawValue());
      // Aqui você pode enviar para o backend
    }
  }
}
