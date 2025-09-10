import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: 'Text' | 'Number' | 'Select' | 'Date';
  required?: boolean;
  options?: QuestionOption[];
  label: string;
  dateFormat?: string;
}

export interface Answers {
  [key: string]: string | number | boolean;
}

export interface StateModel {
  questions: Question[];
}

export interface StoreModel {
  mystore: StateModel;
}

export class CustomFormControl extends FormControl {
  question: Question;

  constructor(
    question: Question,
    formState?: any,
    validatorOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOpts, asyncValidator);

    this.question = question;

    if (this.question.required) this.addValidators([Validators.required]);
  }
}

export interface CustomFormControls {
  [key: string]: CustomFormControl;
}

export class CustomFormGroup extends FormGroup {
  constructor(
    controls: CustomFormControls,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}
