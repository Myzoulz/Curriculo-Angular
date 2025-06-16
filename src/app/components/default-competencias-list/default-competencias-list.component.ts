import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, Validators, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DefaultInputComponent } from "../default-input/default-input.component";
import { CommonModule } from '@angular/common';
import { DefaultSelectComponent } from "../default-select/default-select.component";


@Component({
  selector: 'app-default-competencias-list',
  templateUrl: './default-competencias-list.component.html',
  styleUrl: './default-competencias-list.component.css',
  standalone: true,
  imports: [DefaultInputComponent, ReactiveFormsModule, CommonModule, DefaultSelectComponent]
})
export class DefaultCompetenciasListComponent {
  @Input() formArray!: FormArray;

  nivelOptions = ['Básico', 'Intermediário', 'Avançado'];

  constructor(private fb: FormBuilder) {}

  getDescricaoControl(group: any): FormControl {
    return group.get('descricao') as FormControl;
  }

  getNivelControl(group: any): FormControl {
    return group.get('nivel') as FormControl;
  }

  addCompetencia() {
  if (this.formArray.length >= 4) {
    return;
  }
  this.formArray.push(this.fb.group({
    descricao: ['', Validators.required],
    nivel: ['', Validators.required]
  }));
}

  removeCompetencia(index: number) {
    this.formArray.removeAt(index);
  }
}
