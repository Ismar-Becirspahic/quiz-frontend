import { createAction, props } from '@ngrx/store';
import {QuestionModel} from "../models/question.model";
export const fetchQuestions = createAction(
  '[Quiz] Fetch Questions'
);
export const fetchQuestionsSuccess = createAction(
  '[Quiz] Fetch Questions Success',
  props<{ questions: QuestionModel[] }>()
);
export const answerQuestion = createAction(
  '[Quiz] Answer Question',
  props<{ answer: any }>()
);
export const review = createAction(
  '[Quiz] Review Quiz',
);
export const nickname = createAction(
  '[Quiz] Nickname Entered',
);
export const score = createAction(
  '[Quiz] Check the Scoreboard',
);
export const getProgressPercent = createAction(
  '[Quiz] Get Progress Percent',

);
export const resetQuiz = createAction('[Quiz] Reset Quiz');
export const resetQuizSuccess = createAction('[Quiz] Reset Quiz Success',  props<{ questions: QuestionModel[] }>()
);

export const skipQuestion = createAction(
  '[Quiz] Skip Question',
);
export const closeModal = createAction(
  '[Quiz] Modal Closed',
);
