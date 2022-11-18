import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { PlaceResult } from 'src/app/models/place-result';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ResultsService } from 'src/app/Services/results.service';
import { SwiperOptions } from 'swiper';
import { Type } from 'src/app/models/type';

// import {} from 'googlemaps'; // Not sure if this is needed
declare var google;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  // To use to easily switch between mock and API data
  // TRUE = using Google Data (so, use FALSE most of the time)
  useAPI: boolean = false;

  // To get current geolocation
  position: Position = null;

  // These are current coordinates being pulled in from the geolocation
  currentLatitude: number = null;
  currentLongitude: number = null;

  // To display data results
  // newPlace: PlaceResult = new PlaceResult();
  searchResults: Array<PlaceResult>;

  // Inputs for API Nearby Search method
  // For V2, we can let the user choose the radius and number of results?
  searchType: string = 'restaurant';
  searchRadius: number = 50000; // this is in meters
  // searchLimit: number = 3;

  // These are the current categories we are going to allow the user to search by
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
    { id: 9, type: 'concert', name: 'musical-notes-outline', selected: false },
  ];
  selectedType?: Type;

 // Used for carousel (which we don't need on the search page)
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
    // To get current user's geolocation on page load
    this.getCurrentLocation();
  }

  onSwiper([swiper]) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }


  // To get current user's geolocation to use in Nearby Search
  getCurrentLocation() {
    this.geoService.getCurrentPosition().subscribe((result) => {
      this.position = result;
      this.currentLatitude = this.position.coords.latitude;
      this.currentLongitude = this.position.coords.longitude;
      console.log('Current Latitude: ' + this.currentLatitude);
      console.log('Current Longitude: ' + this.currentLongitude);
    });
  }
  

  // To switch from using the API data to the mock data (set boolean above)
  toggleDataSource() {
    if (this.useAPI == true) {
      // use API endpoints
      this.setSearchResults(this.currentLatitude, this.currentLongitude, this.selectedType.type, this.searchRadius);

    } else {
      // use MOCK endpoints
      this.searchAll();
    }
  }

  ////////// GOOGLE API -- GET ALL RESULTS //////////
  // GET / Nearby Search (by current geolocation)
  // This calls the function from the Google API to get the results in a Promise
  nearbySearchByGeolocation(latLng, searchType, searchRadius) {
    var service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    let request = {
      location: latLng,
      // rankBy: 'distance', // Not sure if this is working
      radius: searchRadius,
      // types: [searchType],
      keyword: searchType
      // We may want to pivot to keyword since more results may appear?
    };

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
          // console.log("Search Type: ", searchType);
        } else {
          reject(status);
          console.log('Nearby Search error: ', status);
          // If this yields "ZERO_RESULTS", we may need to set that to a variable to display something else on the page (like a donut shop?!)
        }
      });
    });
  }

  // This calls the promise to set the variable we can use in the HTML
  setSearchResults(lat, long, searchType, searchRadius) {
    let latLng = new google.maps.LatLng(lat, long);

    this.nearbySearchByGeolocation(latLng, searchType, searchRadius).then(
      (results: Array<any>) => {
        // Where/when do we limit the number of results we want to display?
        this.searchResults = results;
        console.log("Search Results: ", this.searchResults);
        // V2 -- See about limiting results if not OPERATIONAL and/or having better searching/sorting by rating 

        for (let i = 0; i < 3; i++) {
          results[i].photos &&
            results[i].photos.forEach(photo => {
            this.searchResults[i].photo_reference = photo.getUrl({ maxWidth: 500, maxHeight: 500 });
            // We may also need to add the html_attributions here and to the model as well
          });
        }
      },
      (status) => console.log("Status: ", status)
    );
  }


  ////////// MOCK -- GET ALL RESULTS //////////
  searchAll() {
    this.resultsService.getAllResults().subscribe((ReturnedPlaces) => {
      this.searchResults = ReturnedPlaces;
      console.log(ReturnedPlaces);
    });
  }

  // To set the category from the icon click on the search page
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
