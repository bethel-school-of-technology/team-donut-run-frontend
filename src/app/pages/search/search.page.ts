import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { PlaceResult } from 'src/app/models/place-result';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ResultsService } from 'src/app/Services/results.service';
import SwiperCore, { SwiperOptions } from 'swiper';

// import {} from 'googlemaps'; // Not sure if this is needed
declare var google;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  // To get current geolocation
  position: Position = null;

  // These are current coordinates being pulled in from the geolocation
  currentLatitude: number = null;
  currentLongitude: number = null;

  // To display data results
  // newPlace: PlaceResult = new PlaceResult();
  searchResults: Array<PlaceResult>;

  // To use to easily switch between mock and API data
  useAPI: boolean = false;

  // Inputs for API Nearby Search method
  // For V2, we can let the user choose the radius and number of results?
  searchType: string = 'restaurant';
  searchRadius: number = 35000; // this is in meters
  // searchLimit: number = 3;

  // What is this used for? To carousel?
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

  constructor(
    private resultsService: ResultsService,
    private geoService: GeolocationService
  ) {}

  ngOnInit() {
    // To get current user's geolocation on page load
    this.getGPS();
    
  }

  // To get current user's geolocation to use in Nearby Search
  getGPS() {
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
      this.setSearchResults(this.currentLatitude, this.currentLongitude, this.searchType, this.searchRadius);

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
      radius: searchRadius,
      types: [searchType],
      // rankby: 'distance', // Not sure if this is working
    };

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
          console.log('Nearby Search error: ', status);
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

        for (let i = 0; i < 3; i++) {
          results[i].photos &&
            results[i].photos.forEach(photo => {
            this.searchResults[i].photo_reference = photo.getUrl({ maxWidth: 500, maxHeight: 500 });
            // We may also need to add the html_attributions here and to the model as well

          // V2 -- See about limiting results if not OPERATIONAL and/or having better searching/sorting by rating 
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
}
