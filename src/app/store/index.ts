import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { StateModel } from '../models';
import { Api } from '../api/api';
import { lastValueFrom } from 'rxjs';

export class GetQuestions {
  static readonly type = '[Store] Get Questions';
}

@Injectable()
@State<StateModel>({
  name: 'mystore',
})
export class MyStore {
  private api = inject(Api);

  @Action(GetQuestions)
  async getQuestions({ setState }: StateContext<StateModel>) {
    const questions = await lastValueFrom(this.api.getQuestions());

    return setState({ questions });
  }
}
