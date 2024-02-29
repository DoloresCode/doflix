import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { imagesBaseUrl } from '../../constants/images-sizes';
import { Movie } from '../../types/movie';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input() slides : Movie[] = [];
  @Input() isHeader =false;

  constructor() {}
  
  
  // items = ['Name1', 'Name2', 'Name3', 'Name4', 'Name5']

  slideIndex = 0;

  imagesBaseUrl = imagesBaseUrl;

  // It is used to change the slide index every time the interval is triggered by the setInterval function every 5 seconds
  
  ngOnInit() {
    if (!this.isHeader) {
    this.changeSlide();
    }
  }
  
  // change the slide index every 5 seconds and if the slide index is superior to 10, it will be reset to 0
  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }
}