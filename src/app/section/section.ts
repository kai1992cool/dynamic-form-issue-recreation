import { Component, computed, input, Pipe, PipeTransform } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Control } from '../control/control';
import { CustomFormControl, CustomFormGroup, Question } from '../models';

@Pipe({
  name: 'controls',
})
export class ControlsPipe implements PipeTransform {
  transform(controls: {
    [key: string]: AbstractControl<any, any>;
  }): CustomFormControl[] {
    return Object.values(controls) as CustomFormControl[];
  }
}

@Component({
  selector: 'app-section',
  imports: [FormsModule, ReactiveFormsModule, Control, ControlsPipe],
  providers: [ControlsPipe],
  templateUrl: './section.html',
  styleUrl: './section.scss',
})
export class Section {
  questions = input.required<Question[]>();

  formGroup = computed(() => {
    const group = new CustomFormGroup({});

    for (const question of this.questions()) {
      const control = new CustomFormControl(question);

      group.addControl(question.id, control);
    }

    return group;
  });
}
