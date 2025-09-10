import { afterNextRender, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { StoreModel } from './models';
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

  constructor() {
    afterNextRender(() => {
      this.store.dispatch(new GetQuestions());
    });
  }
}
