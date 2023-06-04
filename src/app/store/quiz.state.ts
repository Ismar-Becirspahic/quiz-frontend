import {QuestionModel} from "../models/question.model";

export interface QuizState {
  questions: QuestionModel[];
  currentQno: number;
  points: number;
  correctAnswer: number;
  inCorrectAnswer: number;
  isQuizCompletedQuiz: boolean;
  progress: string | null;
  review: boolean;
  score: boolean;
  skippedQuestion: number;
  isNickname: boolean;
  isModal: boolean;
}
