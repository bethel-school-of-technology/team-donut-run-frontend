import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
  useAPIPhotos: boolean = true;

  // User variables
  currentUser: User = new User();
  currentUserId: number;

  // Experience variables
  newExperience: Experience = new Experience();
  firstPlaceId: string;
  firstPlaceName: string;
  firstPlaceSet: boolean;
  openFirst: boolean;
  firstSearchResults: Array<PlaceResult>;
  firstSearchString: string;

  secondPlaceId: string;
  secondPlaceName: string;
  secondPlaceSet: boolean;
  openSecond: boolean;
  secondSearchResults: Array<PlaceResult>;
  secondSearchString: string;

  thirdPlaceId: string;
  thirdPlaceName: string;
  thirdPlaceSet: boolean;
  openThird: boolean;
  thirdSearchResults: Array<PlaceResult>;
  thirdSearchString: string;

  // Search and place variables
  // searchString: string;
  // searchResults: Array<PlaceResult>;
  // searchRadius: number = 50000; // this is in meters
  searchLimit: number = 3;
  searchCity: string;
  searchState: string;
  searchLatitude: number = null;
  searchLongitude: number = null;
  locationSet: boolean;

  constructor(
    private expService: ExperienceService,
    private authService: AuthService,
    private router: Router,
    private geoService: GeolocationService,
    private alertController: AlertController,
    public navCtrl: NavController
  ) { }


  ngOnInit() {

    this.authService.getCurrentUser().subscribe(
      (response) => {
        if (response != null) {
          this.currentUser = response;
          this.currentUserId = response.userId;
          console.log('Current User Id: ', this.currentUserId);
        } else {
          console.log('No active user signed in.');
          this.navCtrl.navigateForward('sign-in');
        }
      },
      (error) => {
        console.log('Current User Error: ', error);
      }
    );

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  searchByString(searchString: string): Array<PlaceResult> {
    if (searchString != null) {
      console.log('Search String: ', searchString);

      let searchResults = this.setSearchResults(
        this.searchLatitude,
        this.searchLongitude,
        searchString
      );

      console.log('String Search Results: ', searchResults);
      return searchResults;
    } else {
      // Add alert here that there must be an entry?
      console.log('Must enter valid string');
    }
  }

  // Set the places for the experience
  setFirstPlace(googlePlaceId: string, name: string) {
    this.firstPlaceId = googlePlaceId;
    this.firstPlaceName = name;
    this.firstPlaceSet = true;
    console.log('First Place: ', this.firstPlaceId);
  }

  unsetFirstPlace() {
    this.firstPlaceId = null;
    this.firstPlaceName = null;
    this.firstPlaceSet = false;
  }

  setSecondPlace(googlePlaceId: string, name: string) {
    this.secondPlaceId = googlePlaceId;
    this.secondPlaceName = name;
    this.secondPlaceSet = true;
    console.log('Second Place: ', this.secondPlaceId);
  }

  unsetSecondPlace() {
    this.secondPlaceId = null;
    this.secondPlaceName = null;
    this.secondPlaceSet = false;
  }

  setThirdPlace(googlePlaceId: string, name: string) {
    this.thirdPlaceId = googlePlaceId;
    this.thirdPlaceName = name;
    this.thirdPlaceSet = true;
    console.log('Third Place: ', this.thirdPlaceId);
  }

  unsetThirdPlace() {
    this.thirdPlaceId = null;
    this.thirdPlaceName = null;
    this.thirdPlaceSet = false;
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
      this.newExperience.firstGooglePlaceId = this.firstPlaceId;
      this.newExperience.secondGooglePlaceId = this.secondPlaceId;
      this.newExperience.thirdGooglePlaceId = this.thirdPlaceId;
      // Do we need to do this to set the other form items or does that happen automatically with data binding on submit?
      // console.log("New Experience: ", this.newExperience);
      // Call create experience method from service

      this.expService
        .createNewExperience(this.newExperience)
        .subscribe((result) => {
          console.log('New Experience Result: ', result);
          this.newExperienceAddedAlert();
          this.router.navigate(['my-experiences']).then(() => {
          window.location.reload();
        });
        });
    } else {
      this.signInToCreateExperienceAlert();
      this.router.navigate(['sign-in']);
    }
  }

  nearbySearchByGeolocation(latLng, searchString) {
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

  setSearchResults(lat, long, searchString): Array<PlaceResult> {
    let latLng = new google.maps.LatLng(lat, long);
    let searchResults = [];

    this.nearbySearchByGeolocation(latLng, searchString).then(
      (results: Array<any>) => {
        // searchResults = results;
        results.forEach(p => {
          if (p.user_ratings_total > 50 && p.rating > 4) {

            searchResults.push(p);
          }
        });

        // Sort results list descending by weighted_value
        searchResults.sort((a, b) => b.rating - a.rating);

        // Limit length of search results to pre-determined limit
        if (searchResults.length > this.searchLimit) {
          searchResults.length = this.searchLimit;
          // console.log(this.searchResults.length);
        }

        // Get photo and short_address
        searchResults.forEach((sr) => {
          let placeId = sr.place_id;
          let foundPlace = results.find((p) => p.place_id === placeId);

          if (this.useAPIPhotos == true) {
            sr.photo_reference = foundPlace.photos[0].getUrl({
              maxWidth: 500,
              maxHeight: 500,
            });
          }

          if (
            foundPlace.plus_code == null ||
            foundPlace.plus_code == undefined
          ) {
            // Will/does this happen often enough that we need to handle it?
            sr.short_address = 'Address not available.';
            console.log('Address not available.');
          } else {
            let address = foundPlace.plus_code.compound_code;
            let split = address.split(/ (.*)/);
            sr.short_address = split[1];
          }
        });

        console.log('Search Results: ', searchResults);

        // return searchResults;
      },
      (status) => {
        if (status == 'ZERO_RESULTS') {
          // If this yields "ZERO_RESULTS", set this.searchResults to be a donut shop with a note that says "Sorry, no results, but here's a donut shop" LOL

          this.zeroResultsFoundAlert();
        }
        console.log('Status: ', status);
        // return null;
      }
    );

    return searchResults;
  }

  clearSelectedLocation() {
    this.searchCity = '';
    this.searchState = '';
    this.locationSet = false;

    this.firstPlaceId = '';
    this.firstPlaceSet = false;
    this.openFirst = false;
    this.firstSearchResults = [];
    this.firstSearchString = '';
    this.firstPlaceName = '';

    this.secondPlaceId = '';
    this.secondPlaceSet = false;
    this.openSecond = false;
    this.secondSearchResults = [];
    this.secondSearchString = '';
    this.secondPlaceName = '';

    this.thirdPlaceId = '';
    this.thirdPlaceSet = false;
    this.openThird = false;
    this.thirdSearchResults = [];
    this.thirdSearchString = '';
    this.thirdPlaceName = '';

    this.newExperience.experienceUserLocation = '';
  }

  setLocationInput() {
    if (this.searchCity == undefined || this.searchState == undefined) {
      this.cityOrStateMissingAlert();
      this.clearSelectedLocation();
    } else {
      this.geoService
        .getLocationData(this.searchCity, this.searchState)
        .subscribe(
          (result) => {
            if (result == null || result == undefined || result.length == 0) {
              this.cityDoesNotExistAlert();
              this.clearSelectedLocation();
            } else {
              this.searchLatitude = result[0].lat;
              this.searchLongitude = result[0].lon;

              this.searchCity =
                this.searchCity.charAt(0).toUpperCase() +
                this.searchCity.slice(1);
              this.newExperience.experienceUserLocation = `${this.searchCity}, ${this.searchState}`;

              this.locationSet = true;
              console.log(
                'Set Location: ',
                this.newExperience.experienceUserLocation
              );
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

  async newExperienceAddedAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'New experience added!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async signInToCreateExperienceAlert() {
    const alert = await this.alertController.create({
      header: 'Try Again!',
      message: 'Please sign in to create a new experience!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
