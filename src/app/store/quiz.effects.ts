import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {QuizService} from "../services/quiz.service";
import {fetchQuestions, fetchQuestionsSuccess, resetQuiz, resetQuizSuccess} from "./quiz.actions";
import {map, mergeMap, switchMap} from "rxjs";
import { QuestionModel } from "../models/question.model";

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private quizService: QuizService) {
  }

  fetchQuestions$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fetchQuestions),
        mergeMap(() => {
          return this.quizService.getQuestions().pipe(
            map((questions) => {
              const selectedQuestions: QuestionModel[] = [];
              while (selectedQuestions.length < 10) {
                const randomIndex = Math.floor(Math.random() * questions.length);
                const randomQuestion = questions[randomIndex];
                if (!selectedQuestions.includes(randomQuestion)) {
                  selectedQuestions.push(randomQuestion);
                }
              }
              return fetchQuestionsSuccess({ questions: selectedQuestions });
            })
          );
        })
      );
    }
  );
  resetQuiz$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(resetQuiz),
        mergeMap(() => {
          return this.quizService
            .resetQuestions()
            .pipe(map((questions) => {
              const selectedQuestions: QuestionModel[] = [];
              while (selectedQuestions.length < 10) {
                const randomIndex = Math.floor(Math.random() * questions.length);
                const randomQuestion = questions[randomIndex];
                if (!selectedQuestions.includes(randomQuestion)) {
                  selectedQuestions.push(randomQuestion);
                }
              }
              return resetQuizSuccess({ questions: selectedQuestions });
            })
          )
        })
      )
    },
  );
}
