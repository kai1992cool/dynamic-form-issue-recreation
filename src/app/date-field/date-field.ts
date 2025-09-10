import { afterNextRender, Component, inject } from '@angular/core';
import { Field } from '../field/field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatInput } from '@angular/material/input';

const MOMENT_DATE_FORMATS = {
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

@Component({
  selector: 'app-date-field',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInput,
  ],
  providers: [
    // {
    //   provide: MAT_DATE_FORMATS,
    //   useValue: MOMENT_DATE_FORMATS,
    // },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
  templateUrl: './date-field.html',
  styleUrl: './date-field.scss',
})
export class DateField extends Field {
  // Didn't work
  // formats = inject(MAT_DATE_FORMATS);

  // constructor() {
  //   super();

  //   afterNextRender(() => {
  //     const format = this.control().question.dateFormat;

  //     if (format) {
  //       this.formats.display.dateInput = format;
  //       this.formats.parse.dateInput = format;
  //     }
  //   });
  // }

  onKeyPress(event: KeyboardEvent) {
    this.formatDate(event);

    // Restrict user from entering non-numeric characters, except /
    if ((event.charCode >= 48 && event.charCode < 58) || event.charCode === 47)
      return true;
    else return false;
  }

  private formatDate(event: Event) {
    if (event !== null && event.target) {
      const targetValue = (event.target as HTMLInputElement).value;

      if (targetValue.length === 2) {
        (event.target as HTMLInputElement).value = targetValue + '/';
      } else if (
        targetValue.indexOf('/') > 0 &&
        targetValue.length === 5 &&
        this.control()?.question?.dateFormat !== 'MM/YYYY'
      ) {
        (event.target as HTMLInputElement).value = targetValue + '/';
      }
    }
  }
}
