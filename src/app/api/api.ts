import { Injectable } from '@angular/core';
import { Question } from '../models';
import { of } from 'rxjs';

const MOCK_QUESTIONS: Question[] = [
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

@Injectable({
  providedIn: 'root',
})
export class Api {
  getQuestions() {
    // Mock API call
    return of(MOCK_QUESTIONS);
  }
}
