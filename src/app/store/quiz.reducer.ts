import {createReducer, on} from '@ngrx/store';
import { QuizState } from './quiz.state';
import * as QuizActions from './quiz.actions';

export const initialQuizState: QuizState = {
  questions: [],
  currentQno: 0,
  points: 0,
  correctAnswer: 0,
  inCorrectAnswer: 0,
  isQuizCompletedQuiz: false,
  progress: '0',
  review: false,
  score: false,
  skippedQuestion: 0,
  isNickname: false,
  isModal:false
}

const _quizReducer = createReducer(
  initialQuizState,
  on(QuizActions.fetchQuestions, (state) => ({...state})),
  on(QuizActions.fetchQuestionsSuccess, (state, action) => ({
      ...state,
      questions: action.questions,
  })),
  on(QuizActions.answerQuestion, (state, { answer }) => {
    const newState = { ...state };
    if (newState.currentQno === state.questions.length) {
      newState.isQuizCompletedQuiz = true;
    }
    if (answer.correct) {
      newState.points += 10;
      newState.correctAnswer++;
      newState.currentQno++;
      newState.progress = ((newState.currentQno / state.questions.length) * 100).toString();
    } else {
      newState.inCorrectAnswer++;
      newState.currentQno++;
      newState.progress = ((newState.currentQno / state.questions.length) * 100).toString();
    }
    return newState;
  }),

  on(QuizActions.resetQuizSuccess,  (state, action) => ({
    ...state,
    questions: action.questions,
    points: 0,
    currentQno: 0,
    progress: '0',
    correctAnswer: 0,
    inCorrectAnswer: 0,
    review: false,
    score: false,
    skippedQuestion: 0,
    isModal:false
  })),
  
  on(QuizActions.skipQuestion, (state) =>{
    const newState = { ...state };
    newState.currentQno = state.currentQno + 1;
    newState.skippedQuestion = state.skippedQuestion + 1;
    newState.progress = ((newState.currentQno / state.questions.length) * 100).toString();
    return newState;
  }),
  on(QuizActions.review, (state) =>({
  ...state,
    review: !state.review,
    score: false,
    isModal: true
  })),
  on(QuizActions.score, (state) =>({
    ...state,
    score: !state.score,
    review: false,
    isModal:true
  })),
  on(QuizActions.nickname, (state) =>({
    ...state,
    isNickname: !state.isNickname,
  })),
  on(QuizActions.closeModal, (state) =>({
    ...state,
    isModal:!state.isModal,
    review: false,
    score:false
  })),

);


export function quizReducer(state: QuizState = initialQuizState, action: any) {
  return _quizReducer(state, action);
}

