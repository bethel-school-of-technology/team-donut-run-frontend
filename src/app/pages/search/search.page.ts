import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { PlaceResult } from 'src/app/models/place-result';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ResultsService } from 'src/app/Services/results.service';
import { Type } from 'src/app/models/type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

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

  // Used for advanced serach
  searchCity: string;
  searchState: string;
  searchLatitude: number = null;
  searchLongitude: number = null;
  // resultLatitude: number = null;
  // resultLongitude: number = null;

  // To display data results
  // newPlace: PlaceResult = new PlaceResult();
  searchResults: Array<PlaceResult>;

  // Inputs for API Nearby Search method
  // For V2, we can let the user choose the radius and number of results?
  // searchType: string = 'restaurant';
  searchRadius: number = 50000; // this is in meters
  // searchLimit: number = 3;
  useAdvSearch: boolean = false;

  // These are the current categories we are going to allow the user to search by
  categoryTypes: Type[];
  selectedType?: Type;

  constructor(
    private resultsService: ResultsService,
    private geoService: GeolocationService,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // To get the current category types from local json file
    this.getJSON().subscribe((data) => {
      this.categoryTypes = data.categories;
    });
    // To get current user's geolocation on page load
    this.getCurrentLocation();
  }

  breakpoints = {
    100: { slideaPerView: 1.5, spaceBetween: 5},
    320: { slidesPerView: 2.5, spaceBetween: 10 },
    768: { slidesPerView: 3.5, spaceBetween: 10 },
    1000: { slidesPerView: 4.5, spaceBetween: 10 },
    1100: { slidesPerView: 5, spaceBetween: 10 }
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
    if (this.selectedType == null) {
      this.selectCategoryAlert();
      console.log('Type not selected');
    } else {
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
  }
  

  // To switch to using Advanced Search
  toggleAdvancedSearch = (event) => {
    this.useAdvSearch = !this.useAdvSearch;

    console.log("Advanced Search: ", this.useAdvSearch);
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
          // Maybe add error handling that if the photo isn't available, we skip it?
          results[i].photos &&
            results[i].photos.forEach((photo) => {
              this.searchResults[i].photo_reference = photo.getUrl({
                maxWidth: 500,
                maxHeight: 500,
              });
            });

          if (
            results[i].plus_code == null ||
            results[i].plus_code == undefined
          ) {
            // Will/does this happen often enough that we need to handle it?
            console.log('Address not available.');
          } else {
            let address = results[i].plus_code.compound_code;
            let split = address.split(/ (.*)/);
            this.searchResults[i].short_address = split[1];
          }
        }
      },
      (status) => {
        if (status == 'ZERO_RESULTS') {
          // If this yields "ZERO_RESULTS", set this.searchResults to be a donut shop with a note that says "Sorry, no results, but here's a donut shop" LOL

          this.zeroResultsFoundAlert();
        }
        console.log('Status: ', status);
      }
    );
  }

  ////////// ADVANCED SEARCH BY USER INPUT //////////
  searchByUserInput() {
    if (this.selectedType == null) {
      this.selectCategoryAlert();
      console.log('Type not selected');
    } else {
      if (this.searchCity == undefined || this.searchState == undefined) {
        this.cityOrStateMissingAlert();
        //console.log('City or state is undefined. Unable to complete search.');
      } else {
        this.geoService
          .getLocationData(this.searchCity, this.searchState)
          .subscribe(
            (result) => {
              if (result == null || result == undefined || result.length == 0) {
                this.cityDoesNotExistAlert();
                //console.log('City does not exist for selected state.');
              } else {
                this.searchLatitude = result[0].lat;
                this.searchLongitude = result[0].lon;
                console.log(
                  'Result: ',
                  this.searchLatitude,
                  this.searchLongitude
                );

                if (this.useAPI == true) {
                  // use API data
                  this.setSearchResults(
                    this.searchLatitude,
                    this.searchLongitude,
                    this.selectedType.type,
                    this.searchRadius
                  );
                } else {
                  // use MOCK data (doesn't care about user input)
                  this.mockSearchAll();
                  console.log(
                    'Using mock data, advanced search not available.'
                  );
                }
              }
            },
            (error) => {
              console.log('Error: ', error);
            }
          );
      }
    }
  }

  stateOptions: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  // To set the state based on the dropdown
  setState(event) {
    this.searchState = event.detail.value;
    console.log('State Set: ', this.searchState);
  }

  ////////// MOCK -- GET ALL RESULTS //////////
  mockSearchAll() {
    this.resultsService.getAllResults().subscribe((ReturnedPlaces) => {
      this.searchResults = ReturnedPlaces;
      console.log(ReturnedPlaces);
    });
  }

  /////////  ALERTS ///////////
  async selectCategoryAlert() {
    const alert = await this.alertController.create({
      header: 'Try Again!',
      message: 'Please select a category',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async zeroResultsFoundAlert() {
    const alert = await this.alertController.create({
      header: 'Try Again!',
      message: 'No results found',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cityDoesNotExistAlert() {
    const alert = await this.alertController.create({
      header: 'Try Again!',
      message: 'City does not exist for selected state',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cityOrStateMissingAlert() {
    const alert = await this.alertController.create({
      header: 'Try Again!',
      message: 'City and/or state missing for advanced search',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

