import { Component, OnInit } from '@angular/core';
import { MyPlace } from 'src/app/models/my-place';
import { PlaceResult } from 'src/app/models/place-result';
import { MyPlacesService } from 'src/app/services/my-places.service';
import { ResultsService } from 'src/app/Services/results.service';

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
  mySavedPlaces: PlaceResult[] = [];
  currentGooglePlaceId: string = '';
  currentPlaceDetails: PlaceResult = new PlaceResult();

  constructor(
    private placesService: MyPlacesService,
    private resultsService: ResultsService
  ) {}

  ngOnInit() {
    //get the current userID
    // this.currentUserId = 4;
    // this.findAllPlacesByUserId(this.currentUserId);
    this.getSavedResultsByGooglePlaceId2('ChIJGVuc4xGGZIgR7fI2E4yqTpU');
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
      .getSavedResultsByGooglePlaceId(googlePlaceId)
      .subscribe((result) => {
        this.currentPlaceDetails = result[0];
        this.mySavedPlaces.push(this.currentPlaceDetails);
      });
  }

  // TEST -- get saved card place details by Google Place Id
  getSavedCardPlaceDetails(googlePlaceId) {
    this.resultsService.getSavedResultsByGooglePlaceId2(googlePlaceId);
  }

  getSavedResultsByGooglePlaceId2(googlePlaceId: string) {
    var request = {
      placeId: googlePlaceId,
      fields: ['place_id', 'name', 'types'],
    };

    console.log('Request: ', request);

    // var service: google.maps.places.PlacesService;

    // var service = new google.maps.places.PlacesService(document.createElement('div'));

    let service = new google.maps.places.PlacesService(
      document.getElementById('main').appendChild(document.createElement('div'))
    );

    service.getDetails(request, function (result, status) {

      // "result" is what returns the PlaceResult object, so we need to assign that data to a variable
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('Callback Results: ', result);
        console.log('Status: ', google.maps.places.PlacesServiceStatus);
      }
    });

    // console.log("Service: ", service);

    // console.log("Response: ", service.getDetails(request, this.callback));
  }

  // callback(results, status) {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       console.log('Callback Results: ', results[i]);
  //       console.log('Status: ', google.maps.places.PlacesServiceStatus);
  //     }
  //   }
  // }
}
