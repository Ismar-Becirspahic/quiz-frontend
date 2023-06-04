import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import {environment} from "../environments/enivronments";
import {EffectsModule} from "@ngrx/effects";
import {QuizModule} from "./quiz.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    BrowserModule,
    QuizModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument(
      {
        logOnly: environment.production,
      }
    )
  ],
  providers: [],
  exports: []
})
export class AppModule {}

