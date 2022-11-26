import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { PlaceResult } from 'src/app/models/place-result';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ResultsService } from 'src/app/Services/results.service';
import { Type } from 'src/app/models/type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  categoryTypes: Type[];
  selectedType?: Type;

  constructor(
    private resultsService: ResultsService,
    private geoService: GeolocationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // To get current user's geolocation on page load
    this.getCurrentLocation();
    // To get the current category types from local json file
    this.getJSON().subscribe((data) => {
      this.categoryTypes = data.categories;
    });
  }

  // Options for the category slider
  catSlideOpts = {
    loop: false,
    effect: 'slide',

    freeMode: true,
    freeModeSticky: false,

    slidesPerView: 'auto',
    spaceBetween: 10,
  };

  // To get the local json category data types
  public getJSON(): Observable<any> {
    return this.http.get('./assets/data/categories.json');
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

  // To switch from using the API data to the mock data (set boolean above)
  toggleDataSource() {
    if (this.useAPI == true) {
      // use API endpoints
      this.setSearchResults(
        this.currentLatitude,
        this.currentLongitude,
        this.selectedType.type,
        this.searchRadius
      );
    } else {
      // use MOCK endpoints
      this.mockSearchAll();
    }
  }

  ////////// GOOGLE API -- GET ALL RESULTS //////////
  // GET / Nearby Search (by current geolocation)
  // This calls the function from the Google API to get the results in a Promise
  // This could technically be placed into the Results Service if we wanted to
  nearbySearchByGeolocation(latLng, searchType, searchRadius) {
    var service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    let request = {
      location: latLng,
      // rankBy: 'distance', // Not sure if this is working
      radius: searchRadius,
      // types: [searchType],
      keyword: searchType,
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
        console.log('Search Results: ', this.searchResults);
        // V2 -- See about limiting results if not OPERATIONAL and/or having better searching/sorting by rating

        for (let i = 0; i < 3; i++) {
          results[i].photos &&
            results[i].photos.forEach((photo) => {
              this.searchResults[i].photo_reference = photo.getUrl({
                maxWidth: 500,
                maxHeight: 500,
              });
            });

          let address = results[0].plus_code.compound_code;
          let split = address.split(' ', 3);
          split.shift();
          address = split.join(' ');
          this.searchResults[i].formatted_address = address;
        }
      },
      (status) => console.log('Status: ', status)
    );
  }

  ////////// MOCK -- GET ALL RESULTS //////////
  mockSearchAll() {
    this.resultsService.getAllResults().subscribe((ReturnedPlaces) => {
      this.searchResults = ReturnedPlaces;
      console.log(ReturnedPlaces);
    });
  }
}
