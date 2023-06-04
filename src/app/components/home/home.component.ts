import {Component, OnInit} from '@angular/core';
import {Route} from "../../routing/route";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public quiz = Route.QUIZ;
  currentSlide = 0;
  slides: HTMLElement[] = [];

  ngOnInit() {
    this.slides = Array.from(document.querySelectorAll('.img-slider .slide'));
    setInterval(() => {
      this.nextSlide();
    }, 7000);
  }

  nextSlide() {
    this.slides[this.currentSlide].classList.remove('active');
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].classList.add('active');
  }
}
