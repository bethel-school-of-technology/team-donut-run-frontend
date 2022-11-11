import { Component, OnInit } from '@angular/core';
import { MyPlace } from 'src/app/models/my-place';
import { PlaceResult } from 'src/app/models/place-result';
import { MyPlacesService } from 'src/app/services/my-places.service';
import { ResultsService } from 'src/app/Services/results.service';

@Component({
  selector: 'app-my-places',
  templateUrl: './my-places.page.html',
  styleUrls: ['./my-places.page.scss'],
})
export class MyPlacesPage implements OnInit {
  //place details variable
  myPlaceArray: MyPlace[] = [];
  currentUserId: number;
  mySavedPlaces: PlaceResult[] = [];
  currentGooglePlaceId: string = '';
  currentPlaceDetails: PlaceResult = new PlaceResult();

  constructor(private placesService: MyPlacesService, private resultsService: ResultsService) {}

  ngOnInit() {
    //get the current userID
    this.currentUserId = 4;
    this.findAllPlacesByUserId(this.currentUserId);
  }

  findAllPlacesByUserId(userId) {
    this.placesService.getPlacesByUserId(userId).subscribe((result) => {
      this.myPlaceArray = result;
      this.getSavedPlaces(this.myPlaceArray);
    });
  }

  getSavedPlaces(myPlaceArray) {
    for (let i = 0; i <= myPlaceArray.length - 1; i++) {
      this.currentGooglePlaceId = myPlaceArray[i].googlePlaceId;
      //for each googlePlaceId in the array, call for the place details
      this.getPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);
    } 
    console.log('Get Saved Places Result: ', this.mySavedPlaces);
  }

  getPlaceDetailsByGooglePlaceId(googlePlaceId) {
    this.resultsService
      .getResultsByGooglePlaceId(googlePlaceId)
      .subscribe((result) => {
        this.currentPlaceDetails = result[0];
        this.mySavedPlaces.push(this.currentPlaceDetails); 
        
      });
  } 

}
