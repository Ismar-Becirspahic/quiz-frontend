import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { quizReducer } from './store/quiz.reducer';
import {QuizService} from "./services/quiz.service";
import {QuizComponent} from "./components/quiz/quiz.component";
import {QuizEffects} from "./store/quiz.effects";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('questions', quizReducer),
        EffectsModule.forFeature([QuizEffects]),
        RouterLink,
        FormsModule,
    ],
  providers: [QuizService],
  declarations: [QuizComponent],
  exports: [QuizComponent],
})
export class QuizModule {}
