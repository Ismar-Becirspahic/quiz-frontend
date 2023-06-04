import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Route} from "./routing/route";
import {QuizComponent} from "./components/quiz/quiz.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: Route.EMPTY,
  component: HomeComponent,
  },
  {
    path: Route.QUIZ,
    component: QuizComponent,
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
