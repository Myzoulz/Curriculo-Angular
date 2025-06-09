import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-home-user-layout',
  imports: [CommonModule],
  templateUrl: './default-home-user-layout.component.html',
  styleUrl: './default-home-user-layout.component.css'
})
export class DefaultHomeUserLayoutComponent {
  @Input() username: string = '';
  @Input() curriculoStatus: 'aprovado' | 'reprovado' | null = null;

  @Output() cadastrar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
}
