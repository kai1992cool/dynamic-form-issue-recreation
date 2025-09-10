import { Component, input } from '@angular/core';
import { CustomFormControl } from '../models';

@Component({
  selector: 'app-field',
  imports: [],
  templateUrl: './field.html',
  styleUrl: './field.scss',
})
export class Field {
  control = input.required<CustomFormControl>();
}
