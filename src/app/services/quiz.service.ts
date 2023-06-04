import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {QuestionModel} from "../models/question.model";
import {environment} from "../../environments/enivronments";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly url: string = `${environment.backendUrl}/questions`;
  constructor(
    private http: HttpClient,
  ) {
  }
  public getQuestions():Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.url}`)
      .pipe(
        map((data) => {
          const questions: QuestionModel[] = [];
          for (let key in data){
            questions.push({...data[key], id: key});
          }
          return questions;
        })
      );
  }
  public resetQuestions():Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.url}`)
      .pipe(
        map((data) => {
          const questions: QuestionModel[] = [];
          for (let key in data){
            questions.push({...data[key], id: key});
          }
          return questions;
        })
      );
  }
  public addUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}`, user);
  }
  public getUsers():Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.url}/users`);
  }
  public updateUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.url}/${user.id}`, user);
  }

}
