import {Component, OnInit} from '@angular/core';
import {QuestionModel} from "../../models/question.model";
import {map, Observable, of} from "rxjs";
import {select, Store} from '@ngrx/store';
import * as QuizActions from '../../store/quiz.actions';
import {
  getCorrectAnswer,
  getCurrentQuestion,
  getInCorrectAnswer,
  getIsQuizCompleted, getModal, getNickname,
  getPoints,
  getProgress,
  getQuestions, getReview, getScoreboard, getSkippedQuestions
} from "../../store/quiz.selector";
import {AppStateInterface} from "../../types/app.state.interface";
import {Route} from "../../routing/route";
import {UserModel} from "../../models/user.model";
import {QuizService} from "../../services/quiz.service";
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  currentUser!: UserModel;
  $users: Observable<UserModel[]>;
  public nickname: string = '';
  review = Route.REVIEW;
  $questions: Observable<QuestionModel[]>;
  $currentQno: Observable<number> = of(0);
  $points: Observable<number>;
  $correctAnswer: Observable<number>;
  $incorrectAnswer: Observable<number>;
  $progress: Observable<string | null>;
  $isQuizCompleted: Observable<boolean>;
  $review: Observable<boolean>;
  $score: Observable<boolean>;
  $skippedQuestion: Observable<number | null>;
  $nickname: Observable<boolean>;
  $modal: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>, private service: QuizService) {
    this.$questions = this.store.pipe(select(getQuestions));
    this.$currentQno = this.store.pipe(select(getCurrentQuestion));
    this.$points = this.store.pipe(select(getPoints));
    this.$correctAnswer = this.store.pipe(select(getCorrectAnswer));
    this.$incorrectAnswer = this.store.pipe(select(getInCorrectAnswer));
    this.$progress = this.store.pipe(select(getProgress));
    this.$isQuizCompleted = this.store.pipe(select(getIsQuizCompleted));
    this.$review = this.store.pipe(select(getReview));
    this.$score = this.store.pipe(select(getScoreboard));
    this.$skippedQuestion = this.store.pipe(select(getSkippedQuestions));
    this.$nickname = this.store.pipe(select(getNickname));
    this.$modal = this.store.pipe(select(getModal));
    this.$users = service.getUsers();
  }

  ngOnInit(): void {
    this.store.dispatch(QuizActions.fetchQuestions());

  }

  nextQuestion() {
    this.store.dispatch(QuizActions.skipQuestion());
  }

  answer(answer: any) {
    this.store.dispatch(QuizActions.answerQuestion({answer}));
  }

  resetQuiz() {
    this.$points.subscribe(points => {
      if (this.currentUser) {
        this.currentUser.points = points;
        if (this.service) {
          this.service.updateUser(this.currentUser).subscribe();
        }
      }
    });
    this.store.dispatch(QuizActions.resetQuiz());
  }

  getProgressPercent() {
    this.store.dispatch(QuizActions.getProgressPercent());
  }

  showReview() {
    this.store.dispatch(QuizActions.review());
  }
  showScoreboard(){
    this.store.dispatch(QuizActions.score());
  }
  hideModal() {
    this.store.dispatch(QuizActions.closeModal());
  }
  saveNickname() {
    const inputField = document.getElementById('nickname') as HTMLInputElement;
    const alertField = document.getElementById('nickname-alert') as HTMLDivElement;

    if (inputField.validity.valid) {
      const user: UserModel = {
        id: '',
        nickname: this.nickname,
        points: 0
      };
      this.$points.subscribe(points => {
        user.points = points;
      });
      this.service.addUser(user).subscribe(newUser => {
        this.currentUser = newUser;
        this.store.dispatch(QuizActions.nickname());
      });
      this.sortUsers();
    } else {
      if (inputField.value.length === 0) {
        alertField.textContent = 'Nickname must not be empty';
      } else if (inputField.value.length < 3) {
        alertField.textContent = 'Nickname must be at least 3 characters long';
      } else if (inputField.value.charAt(0) !== inputField.value.charAt(0).toUpperCase()) {
      alertField.textContent = 'Nickname must start with a capital letter';
    }
  }
  }



  sortUsers() {
    this.$users = this.$users.pipe(
      map(users => users.sort((a, b) => b.points - a.points))
    );
  }
  
}
