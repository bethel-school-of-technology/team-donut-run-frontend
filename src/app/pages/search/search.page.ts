import { Component, OnInit } from '@angular/core';
import { PlaceResult } from 'src/app/models/place-result';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ResultsService } from 'src/app/Services/results.service';
import { SwiperOptions } from 'swiper';
import { Position } from '@capacitor/geolocation';
import { Type } from 'src/app/models/type';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  position: Position = null;
  //These are current coordinates being pulled in from the geolocation
  currentLatitude: number = null;
  currentLongitude: number = null;
  newPlace: PlaceResult = new PlaceResult();
  searchResults: PlaceResult[] = [];
  categoryTypes: Type[] = [
    { id: 1, type: 'tourist_attraction', name: 'rocket-outline' },
    { id: 2, type: 'amusement_park', name: 'people-outline' },
    { id: 3, type: 'restaurant', name: 'restaurant-outline' },
    { id: 4, type: 'bowling_alley', name: 'tennisball-outline' },
    { id: 5, type: 'movie_theater', name: 'ticket-outline' },
    { id: 6, type: 'spa', name: 'bug-outline' },
    { id: 7, type: 'shoe_store', name: 'footsteps-outline' },
    { id: 8, type: 'shopping_mall', name: 'cart-outline' },
    { id: 9, type: 'zoo', name: 'paw-outline' },
  ];
  selectedType?: Type;

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(
    private resultsService: ResultsService,
    private geoService: GeolocationService
  ) {}

  ngOnInit() {
    this.getGPS();
    this.SearchAll();
  }

  onSwiper([swiper]) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  SearchAll() {
    this.searchResults = [];
    this.resultsService.getAllResults().subscribe((ReturnedPlaces) => {
      this.searchResults = ReturnedPlaces;
      console.log(ReturnedPlaces);
    });
  }

  getGPS() {
    this.geoService.getCurrentPosition().subscribe((result) => {
      this.position = result;
      this.currentLatitude = this.position.coords.latitude;
      this.currentLongitude = this.position.coords.longitude;
      console.log('Current Latitude: ' + this.currentLatitude);
      console.log('Current Longitude: ' + this.currentLongitude);
    });
  }

  onSelect(type: Type): void {
    this.selectedType = type;
    console.log(this.selectedType.type);
  }
}
