import { Component, OnInit } from '@angular/core';
import { PlaceResult } from 'src/app/models/place-result';
import { ResultsService } from 'src/app/Services/results.service';
import SwiperCore, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  newPlace: PlaceResult = new PlaceResult();
  SearchResults: PlaceResult[] = [];
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  constructor(private resultsService: ResultsService) { }

  SearchAll() {
    this.SearchResults = [];
    this.resultsService.getAllResults().subscribe(ReturnedPlaces => {
      this.SearchResults = ReturnedPlaces;
      console.log(ReturnedPlaces);
    });
  }

  ngOnInit() {
    this.SearchAll();
  }

}
