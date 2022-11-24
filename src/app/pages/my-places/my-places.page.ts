import { Component, OnInit } from '@angular/core';
import { MyPlace } from 'src/app/models/my-place';
import { PlaceResult } from 'src/app/models/place-result';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MyPlacesService } from 'src/app/services/my-places.service';
import { ResultsService } from 'src/app/Services/results.service';

// Connected to the index.d.ts file to override missing module import
// import {} from 'googlemaps';
declare var google;


@Component({
  selector: 'app-my-places',
  templateUrl: './my-places.page.html',
  styleUrls: ['./my-places.page.scss'],
})

export class MyPlacesPage implements OnInit {

  // To use to easily switch between mock and API data
  // TRUE = using Google Data (so, use FALSE most of the time)
  useAPI: boolean = false;

  // Place details variable
  myPlaceArray: MyPlace[] = [];
  currentUserId: number;

  currentGooglePlaceId: string = '';
  currentPlaceDetails: PlaceResult = new PlaceResult();
  
  // We will use these
  myVisitedPlaces: PlaceResult[] = [];
  myUnvisitedPlaces: PlaceResult[] = [];

  // These may need to change for the API?
  // myVisitedPlaces: Array<PlaceResult[]>;
  // myUnvisitedPlaces: Array<PlaceResult[]>;

  // User variables
  currentUser: User = new User();

  constructor(
    private placesService: MyPlacesService,
    private resultsService: ResultsService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    if (this.useAPI == true) {
      // user real data & database
      this.authService.getCurrentUser().subscribe(user => {
          this.currentUser = user;
          this.currentUserId = user.userId;
          console.log("Current User: ", this.currentUser);
        })
      this.apiFindAllPlacesByUserId(); 

    } else {
      // use mock data
      this.currentUserId = 4;
      this.mockFindAllPlacesByUserId(this.currentUserId);
    }
  
  }

  // This will be used for both mock and API data since it's pulling the user info and My Places from the backend/database
  mockFindAllPlacesByUserId(userId) {
    this.placesService.getPlacesByUserId(userId).subscribe((result) => {
      this.myPlaceArray = result;
      console.log('My Place Results: ', this.myPlaceArray);
      this.sortSavedPlacesByUserId(this.myPlaceArray);
    });
    console.log('Get Visited Places Result: ', this.myVisitedPlaces);
    console.log('Get Unvisited Places Result: ', this.myUnvisitedPlaces);
  }

  // API find all places
  apiFindAllPlacesByUserId() {
    this.placesService.getAllCurrentUserPlaces().subscribe((result) => {
      this.myPlaceArray = result;
      console.log('My Place Results: ', this.myPlaceArray);
      this.sortSavedPlacesByUserId(this.myPlaceArray);
    });
    console.log('Get Visited Places Result: ', this.myVisitedPlaces);
    console.log('Get Unvisited Places Result: ', this.myUnvisitedPlaces);
  }

  // Sorts whether the place has been visited or not
  sortSavedPlacesByUserId(myPlaceArray) {
    for (let i = 0; i <= this.myPlaceArray.length - 1; i++) {
      let currentMyPlace = this.myPlaceArray[i];
      this.currentGooglePlaceId = myPlaceArray[i].googlePlaceId;

      if (currentMyPlace.visited == true) {
        this.getVisitedPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);

      } else {
        this.getUnvisitedPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);
      }
    }
  }

  // Gets Place Details to display on My Places VISITED cards
  getVisitedPlaceDetailsByGooglePlaceId(googlePlaceId) {
    if (this.useAPI == true) {
      // use API endpoints
      this.getAPIPlaceDetails(googlePlaceId).then(
        (results: PlaceResult) => {
          this.currentPlaceDetails = results;
          let typesArray: Array<any> = results.types;
          this.currentPlaceDetails.types = typesArray[0];

          let photoList: Array<any> = this.currentPlaceDetails.photos;
          let placePhoto = photoList[0].getUrl({ maxWidth: 500, maxHeight: 500 });
          this.currentPlaceDetails.photo_reference = placePhoto;

          console.log("API Current Place Details: ", this.currentPlaceDetails);

          this.myVisitedPlaces.push(this.currentPlaceDetails);
  
        }, (status) => console.log("API Status: ", status)
      );
    } else {
      // use MOCK endpoints
      this.resultsService
      .getSavedResultsByGooglePlaceId(googlePlaceId)
      .subscribe((result) => {
        this.currentPlaceDetails = result[0];
        this.currentPlaceDetails.types = result[0].types[0];

        this.myVisitedPlaces.push(this.currentPlaceDetails);
      });
    }
  }

  // Gets Place Details to display on My Places UNVISITED cards (aka, just Saved)
  getUnvisitedPlaceDetailsByGooglePlaceId(googlePlaceId) {
    if (this.useAPI == true) {
      // use API endpoints
      this.getAPIPlaceDetails(googlePlaceId).then(
        (results: PlaceResult) => {
          this.currentPlaceDetails = results;
          let typesArray: Array<any> = results.types;
          this.currentPlaceDetails.types = typesArray[0];     
          
          let photoList: Array<any> = this.currentPlaceDetails.photos;
          let placePhoto = photoList[0].getUrl({ maxWidth: 500, maxHeight: 500 });
          this.currentPlaceDetails.photo_reference = placePhoto;

          console.log("API Current Place Details: ", this.currentPlaceDetails);

          this.myUnvisitedPlaces.push(this.currentPlaceDetails);

        }, (status) => console.log("API Status: ", status)
      );
    } else {
      // use MOCK endpoints
      this.resultsService
      .getSavedResultsByGooglePlaceId(googlePlaceId)
      .subscribe((result) => {
        this.currentPlaceDetails = result[0];
        this.currentPlaceDetails.types = result[0].types[0];
        
        this.myUnvisitedPlaces.push(this.currentPlaceDetails);
      });
    }
    
  }


  ////////// GOOGLE API -- GET MY PLACES & DETAILS //////////
  // This invokes the getDetails call from the Google Places API
  // This could technically be placed into the Results Service if we wanted to (would probably need to rename for the MyPlaces cards)
  getAPIPlaceDetails(googlePlaceId: string) {
    var service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    var request = {
      placeId: googlePlaceId,
      fields: [
        'place_id', 
        'name', 
        'types', 
        'formatted_address',
        'photos'],
    };

    return new Promise((resolve, reject) => {
      service.getDetails(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK)
        {
          resolve(results);
        } else {
          reject (status);
          console.log("Place Details Response Error: ", status);
        }
      });
    });
  }

  // Sets the API results -- Currently being used inline above in getUnvisitedPlaceDetailsByGooglePlaceId and getVisitedPlaceDetailsByGooglePlaceId methods
  // setAPIPlaceDetails(googlePlaceId) {
  //   this.getAPIPlaceDetails(googlePlaceId).then(
  //     (results: PlaceResult) => {
  //       this.currentPlaceDetails = results;
  //       console.log("API Current Place Details: ", this.currentPlaceDetails);
        
  //     }, (status) => console.log("API Status: ", status)
  //   );
  // }

    ////////// USER METHODS //////////


}