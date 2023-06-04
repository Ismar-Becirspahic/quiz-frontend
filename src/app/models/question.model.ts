import {AnswerModel} from "./answer.model";

export interface QuestionModel {
  id: string;
  questionText: string;
  answers: AnswerModel[];
}
