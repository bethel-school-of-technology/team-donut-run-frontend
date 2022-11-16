import { Component, OnInit } from '@angular/core';
import { MyPlace } from 'src/app/models/my-place';
import { PlaceResult } from 'src/app/models/place-result';
import { MyPlacesService } from 'src/app/services/my-places.service';
import { ResultsService } from 'src/app/Services/results.service';

// Connected to the index.d.ts file to override missing module import
import {} from 'googlemaps';

@Component({
  selector: 'app-my-places',
  templateUrl: './my-places.page.html',
  styleUrls: ['./my-places.page.scss'],
})
export class MyPlacesPage implements OnInit {
  //place details variable
  myPlaceArray: MyPlace[] = [];
  currentUserId: number;

  currentGooglePlaceId: string = '';
  currentPlaceDetails: PlaceResult = new PlaceResult();


  //We probably won't need this -- commented out code saves this
  allSavedPlaces: PlaceResult[] = [];
  //We will use these
  myVisitedPlaces: PlaceResult[] = [];
  myUnvisitedPlaces: PlaceResult[] = [];

  constructor(
    private placesService: MyPlacesService,
    private resultsService: ResultsService
  ) {}

  ngOnInit() {

    //get the current userID -- will need to get this from the URL
    this.currentUserId = 4;
    //get all myPlace results for this user
    this.findAllPlacesByUserId(this.currentUserId);
  }


  findAllPlacesByUserId(userId) {
    this.placesService.getPlacesByUserId(userId).subscribe((result) => {
      this.myPlaceArray = result;
      console.log('My Place Results: ', this.myPlaceArray);
      //this.getSavedPlaces(this.myPlaceArray);
      this.sortSavedPlacesByUserId(this.myPlaceArray);
    });
    //console.log('Get Saved Places Result: ', this.allSavedPlaces);
    console.log('Get Visited Places Result: ', this.myVisitedPlaces);
    console.log('Get Unvisited Places Result: ', this.myUnvisitedPlaces);
  }

  //sorts whether the place has been visited or not
  sortSavedPlacesByUserId(myPlaceArray) {
    for (let i = 0; i <= this.myPlaceArray.length - 1; i++) {
      let currentPlace = this.myPlaceArray[i];
      this.currentGooglePlaceId = myPlaceArray[i].googlePlaceId;

      if (currentPlace.visited == true) {
        //for each visited place in the array, call for the place details
        this.getVisitedPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);
      } else {
        //for each unvisited place in the array, call for the place details
        this.getUnvisitedPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);
      }
    }
  }

  getVisitedPlaceDetailsByGooglePlaceId(googlePlaceId) {
    this.resultsService
      .getSavedResultsByGooglePlaceId(googlePlaceId)
      .subscribe((result) => {
        this.currentPlaceDetails = result[0];

        this.currentPlaceDetails.types = result[0].types[0];

        //saves place details to myVisitedPlaces array
        this.myVisitedPlaces.push(this.currentPlaceDetails);
      });
  }

  getUnvisitedPlaceDetailsByGooglePlaceId(googlePlaceId) {
    this.resultsService
      .getResultsByGooglePlaceId(googlePlaceId)
      .subscribe((result) => {
        this.currentPlaceDetails = result[0];
        this.currentPlaceDetails.types = result[0].types[0];
        //saves place details to myUnvisitedPlaces array
        this.myUnvisitedPlaces.push(this.currentPlaceDetails);
      });
  }

  // getSavedPlaces(myPlaceArray) {
  //   for (let i = 0; i <= myPlaceArray.length - 1; i++) {
  //     this.currentGooglePlaceId = myPlaceArray[i].googlePlaceId;
  //     //for each googlePlaceId in the array, call for the place details
  //     this.getAllPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);
  //   }
  // }

  // getAllPlaceDetailsByGooglePlaceId(googlePlaceId) {
  //   this.resultsService
  //     .getResultsByGooglePlaceId(googlePlaceId)
  //     .subscribe((result) => {
  //       this.currentPlaceDetails = result[0];
  //       this.currentPlaceDetails.open_now = result[0].opening_hours.open_now;
  //       this.allSavedPlaces.push(this.currentPlaceDetails);
  //     });
  // }
}