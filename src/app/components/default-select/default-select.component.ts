import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-select',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './default-select.component.html',
  styleUrl: './default-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultSelectComponent),
      multi: true,
    },
  ],
})
export class DefaultSelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() inputName: string = '';

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
  onSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
