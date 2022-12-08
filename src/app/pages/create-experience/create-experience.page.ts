import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Experience } from 'src/app/models/experience';
import { PlaceResult } from 'src/app/models/place-result';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.page.html',
  styleUrls: ['./create-experience.page.scss'],
})
export class CreateExperiencePage implements OnInit {

  useAPI: boolean = true;

  // User variables
  currentUser: User = new User();
  currentUserId: number;

  // Experience variables
  newExperience: Experience = new Experience();
  firstPlace: string;
  firstPlaceSet: boolean;
  openFirst: boolean;

  secondPlace: string;
  secondPlaceSet: boolean;
  openSecond: boolean;

  thirdPlace: string;
  thirdPlaceSet: boolean;
  openThird: boolean;

  // Search and place variables
  searchString: string;
  searchResults: Array<PlaceResult>;
  searchRadius: number = 50000; // this is in meters
  searchLimit: number = 3;
  searchCity: string;
  searchState: string;
  searchLatitude: number = null;
  searchLongitude: number = null;


  constructor(
    private expService: ExperienceService, 
    private authService: AuthService,
    private router: Router,
    private geoService: GeolocationService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      this.currentUserId = user.userId;
      this.authService.currentUser$.next(user);
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  searchByString() {
    console.log("Search String: ", this.searchString);

    this.setSearchResults(
      this.searchLatitude,
      this.searchLongitude,
      this.searchString,
      this.searchRadius
    );

  }

  // Set the places for the experience
  setFirstPlace(googlePlaceId: string) {
    this.firstPlace = googlePlaceId;
    this.firstPlaceSet = true;
    console.log("First Place: ", this.firstPlace);
  }

  setSecondPlace(googlePlaceId: string) {
    this.secondPlace = googlePlaceId;
    this.secondPlaceSet = true;
    console.log("Second Place: ", this.secondPlace);
  }

  setThirdPlace(googlePlaceId: string) {
    this.thirdPlace = googlePlaceId;
    this.thirdPlaceSet = true;
    console.log("Third Place: ", this.thirdPlace);
  }

  toggleFirstPlace = (event) => {
    this.openFirst = !this.openFirst;
  };

  toggleSecondPlace = (event) => {
    this.openSecond = !this.openSecond;
  };

  toggleThirdPlace = (event) => {
    this.openThird = !this.openThird;
  };

  // CREATE/SUBMIT new experience
  createNewExperience() {
    if (this.currentUser != undefined) {
      this.newExperience.firstGooglePlaceId = this.firstPlace;
      this.newExperience.secondGooglePlaceId = this.secondPlace;
      this.newExperience.thirdGooglePlaceId = this.thirdPlace;
      // Do we need to do this to set the other form items or does that happen automatically with data binding on submit?
      console.log("New Experience: ", this.newExperience);
      // Call create experience method from service
    } else {
      window.alert('Please sign in to save place.');
      this.router.navigate(['sign-in']);
    }
  }

  nearbySearchByGeolocation(latLng, searchString, searchRadius) {
    var service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    let request = {
      location: latLng,
      rankBy: google.maps.places.RankBy.DISTANCE, 
      // radius: searchRadius,
      keyword: searchString,
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

  setSearchResults(lat, long, searchString, searchRadius) {
    let latLng = new google.maps.LatLng(lat, long);
    this.searchResults = [];

    this.nearbySearchByGeolocation(latLng, searchString, searchRadius).then(
      (results: Array<any>) => {
        // Where/when do we limit the number of results we want to display?
        results.forEach(p => {
          if (p.user_ratings_total > 100 && p.rating > 4) {
            this.searchResults.push(p);
          }
        });

        // Sort results list descending by weighted_value
        this.searchResults.sort((a, b) => b.rating - a.rating);

        // Limit length of search results to pre-determined limit
        if (this.searchResults.length > this.searchLimit) {
          this.searchResults.length = this.searchLimit;
          // console.log(this.searchResults.length);
        } 

        console.log('Search Results: ', this.searchResults);

        // Get photo and short_address
        this.searchResults.forEach(sr => {
          let placeId = sr.place_id;
          let foundPlace = results.find((p) => p.place_id === placeId);

          // COMMENTING OUT TO LIMIT REQUESTS
          // sr.photo_reference = foundPlace.photos[0].getUrl({
          //   maxWidth: 500,
          //   maxHeight: 500,
          // });

          if (
            foundPlace.plus_code == null ||
            foundPlace.plus_code == undefined
          ) {
            // Will/does this happen often enough that we need to handle it?
            sr.short_address = "Address not available.";
            console.log('Address not available.');
          } else {
            let address = foundPlace.plus_code.compound_code;
            let split = address.split(/ (.*)/);
            sr.short_address = split[1];
          }

        })
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

  setLocationInput() {
    // if (this.searchString == null) {
    //   // Do we want an alert here?
    //   console.log('Type not selected');
    // } else {
      if (this.searchCity == undefined || this.searchState == undefined) {
        this.cityOrStateMissingAlert();
      } else {
        this.geoService
          .getLocationData(this.searchCity, this.searchState)
          .subscribe(
            (result) => {
              if (result == null || result == undefined || result.length == 0) {
                this.cityDoesNotExistAlert();
              } else {
                this.searchLatitude = result[0].lat;
                this.searchLongitude = result[0].lon;

                this.searchCity = this.searchCity.charAt(0).toUpperCase() + this.searchCity.slice(1);
                this.newExperience.experienceLocation = `${this.searchCity}, ${this.searchState}`;
                // console.log(
                //   'Result: ',
                //   this.searchLatitude,
                //   this.searchLongitude
                // );
                console.log("Set Location: ", this.newExperience.experienceLocation);

                // if (this.useAPI == true) {
                //   // use API data
                //   this.setSearchResults(
                //     this.searchLatitude,
                //     this.searchLongitude,
                //     this.searchString,
                //     this.searchRadius
                //   );
                // } else {
                //   // use MOCK data (doesn't care about user input)
                //   // this.mockSearchAll();
                //   console.log(
                //     'Using mock data, advanced search not available.'
                //   );
                // }
              }
            },
            (error) => {
              console.log('Error: ', error);
            }
          );
      // }
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

  /////////  ALERTS ///////////
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

  async zeroResultsFoundAlert() {
    const alert = await this.alertController.create({
      header: 'Try Again!',
      message: 'No results found',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
