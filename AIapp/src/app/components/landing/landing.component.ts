import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, ThemeToggleComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  imgUrl = 'C:/Users/jhon/Documents/code/APP-AI-Backend/AI/app/public/wa11.jpg';

  ngAfterViewInit() {
    new Swiper(this.swiperContainer.nativeElement, {
      modules: [Autoplay, Navigation, Pagination],
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
