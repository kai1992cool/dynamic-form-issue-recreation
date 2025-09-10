import { afterNextRender, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Question, StoreModel } from './models';
import { Section } from './section/section';
import { GetQuestions } from './store';

@Component({
  selector: 'app-root',
  imports: [Section],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private store = inject(Store);

  public questions = this.store.selectSignal(
    (state: StoreModel) => state.mystore.questions
  );

  public mockQuestions: Question[] = [
    {
      label: 'First Name',
      id: 'firstName',
      type: 'Text',
      required: true,
    },
    {
      label: 'Last Name',
      id: 'lastName',
      type: 'Text',
      required: true,
    },
    {
      label: 'Date of Birth',
      id: 'dob',
      type: 'Date',
      required: true,
      dateFormat: 'MM/DD/YYYY',
    },
    {
      label: 'Favorite Animal',
      id: 'animal',
      type: 'Select',
      options: [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
      ],
      required: true,
    },
    {
      label: 'Some other date',
      id: 'animal',
      type: 'Select',
      options: [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
      ],
      required: true,
      dateFormat: 'MM/YYYY',
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.store.dispatch(new GetQuestions());
    });
  }
}
