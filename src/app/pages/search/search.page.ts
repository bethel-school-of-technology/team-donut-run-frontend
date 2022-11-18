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
  //These are the current categories we are going to allow the user to search by
  categoryTypes: Type[] = [
    {
      id: 1,
      type: 'tourist_attraction',
      name: 'rocket-outline',
      selected: false,
    },
    { id: 2, type: 'amusement_park', name: 'people-outline', selected: false },
    { id: 3, type: 'restaurant', name: 'restaurant-outline', selected: false },
    {
      id: 4,
      type: 'bowling_alley',
      name: 'tennisball-outline',
      selected: false,
    },
    { id: 5, type: 'movie_theater', name: 'ticket-outline', selected: false },
    { id: 6, type: 'spa', name: 'bug-outline', selected: false },
    { id: 7, type: 'shoe_store', name: 'footsteps-outline', selected: false },
    { id: 8, type: 'shopping_mall', name: 'cart-outline', selected: false },
    { id: 9, type: 'zoo', name: 'paw-outline', selected: false },
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
    this.getCurrentLocation();
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
      console.log('Search Results: ', ReturnedPlaces);
    });
  }

  getCurrentLocation() {
    this.geoService.getCurrentPosition().subscribe((result) => {
      this.position = result;
      this.currentLatitude = this.position.coords.latitude;
      this.currentLongitude = this.position.coords.longitude;
      console.log('Current Latitude: ' + this.currentLatitude);
      console.log('Current Longitude: ' + this.currentLongitude);
    });
  }

  onCategorySelect(selectedType: Type): void {
    if (this.selectedType == undefined) {
      this.selectedType = selectedType;
      this.selectedType.selected = true;
      console.log('Selected type: ', this.selectedType.type);
    } else {
      this.selectedType.selected = false;
      this.selectedType = selectedType;
      this.selectedType.selected = true;
      console.log('Selected type: ', this.selectedType.type);
    }
  }
}
