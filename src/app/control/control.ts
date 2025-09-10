import { NgComponentOutlet } from '@angular/common';
import { Component, computed, effect, inject, Injector, input } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateField } from '../date-field/date-field';
import { CustomFormControl } from '../models';
import { SelectField } from '../select-field/select-field';
import { TextField } from '../text-field/text-field';

@Component({
  selector: 'app-control',
  imports: [NgComponentOutlet],
  templateUrl: './control.html',
  styleUrl: './control.scss',
})
export class Control {
  private injector = inject(Injector);
  control = input.required<CustomFormControl>();
  component = computed(() => this.getControl());
  injectorRef = computed(() => this.getInjector());
  getControl() {
    const control = this.control();
    const question = control.question;

    if (question.type === 'Text' || question.type === 'Number') {
      return TextField;
    } else if (question.type === 'Select') {
      return SelectField;
    } else if (question.type === 'Date') {
      return DateField;
    } else {
      return TextField;
    }
  }

  getInjector() {
    const control = this.control();
    const format = control.question.dateFormat;

    if (format) {
      let MOMENT_DATE_FORMATS = {
        parse: {
          dateInput: 'MM/DD/YYYY',
        },
        display: {
          dateInput: 'MM/DD/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM-YYYY',
        },
      };

      if (format && format === 'MM/YYYY') {
        MOMENT_DATE_FORMATS = {
          parse: {
            dateInput: 'MM/YYYY',
          },
          display: {
            dateInput: 'MM/YYYY',
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM-YYYY',
          },
        };
      }

      return Injector.create({
        providers: [
          {
            provide: MAT_DATE_FORMATS,
            useValue: MOMENT_DATE_FORMATS,
          },
        ],
        parent: this.injector,
      });
    }

    return Injector.create({
      providers: [],
      parent: this.injector,
    });
  }
}
