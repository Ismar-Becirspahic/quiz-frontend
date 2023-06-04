import {createSelector} from "@ngrx/store";
import {AppStateInterface} from "../types/app.state.interface";

export const selectFeature = (state: AppStateInterface) => state.questions;
export const getQuestions = createSelector(
  selectFeature,
    (state) => state.questions
);
export const getCurrentQuestion = createSelector(
  selectFeature,
  (state) => state.currentQno
);
export const getPoints = createSelector(
  selectFeature,
  (state) => state.points
);
export const getCorrectAnswer = createSelector(
  selectFeature,
  (state) => state.correctAnswer
);
export const getInCorrectAnswer = createSelector(
  selectFeature,
  (state) => state.inCorrectAnswer
);
export const getProgress = createSelector(
  selectFeature,
  (state) => state.progress
);
export const getIsQuizCompleted = createSelector(
  selectFeature,
  (state) => state.isQuizCompletedQuiz
);
export const getReview = createSelector(
  selectFeature,
  (state) => state.review
);
export const getScoreboard = createSelector(
  selectFeature,
  (state) => state.score
);
export const getSkippedQuestions = createSelector(
  selectFeature,
  (state) => state.skippedQuestion
);
export const getNickname = createSelector(
  selectFeature,
  (state) => state.isNickname
);
export const getModal = createSelector(
  selectFeature,
  (state) => state.isModal
);
