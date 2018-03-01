import { Component, OnInit } from '@angular/core';
import { MatchEditorService } from '../services/match-editor.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'swiper/dist/js/swiper.js';

import moment from 'moment-timezone';
import {NgxCarousel} from 'ngx-carousel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public carouselOne: NgxCarousel;
  matches: any = [];
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 40,
    slidesPerView: 3,
    watchSlidesProgress: false,
    paginationHide: true,
    breakpoints: {
      // when window width is <= 480px
      720: {
        slidesPerView: 1,
        spaceBetween: 20,
        // direction: 'vertical'
      },
      // when window width is <= 640px
      1120: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
    // slidesOffsetBefore: 150,
    // slidesOffsetAfter: 50,
    // nested: true
  };
  constructor(private matchEditorService: MatchEditorService) { }

  ngOnInit() {
    this.loadMatches();
    // this.carouselOne = {
    //   grid: {xs: 2, sm: 3, md: 3, lg: 3, all: 0},
    //   slide: 3,
    //   speed: 400,
    //   animation: 'lazy',
    //   point: {
    //     visible: true
    //   },
    //   load: 1,
    //   touch: true,
    //   easing: 'ease'
    // };

  }

  loadMatches() {
    return this.matchEditorService.loadNextMatches()
      .map(matches => {
        this.matches = matches;
      }).subscribe();
  }

  public myfunc(event: Event) {
    console.log(46, event);
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }

}
