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
  mySavedPlaces: PlaceResult[] = [];
  currentGooglePlaceId: string = '';
  currentPlaceDetails: PlaceResult = new PlaceResult();

  constructor(
    private placesService: MyPlacesService,
    private resultsService: ResultsService
  ) {}

  ngOnInit() {
    // get the current userID
    // this.currentUserId = 4;
    // this.findAllPlacesByUserId(this.currentUserId);

    // GOOGLE API TESTING
    // this.getSavedResultsByGooglePlaceId2('ChIJGVuc4xGGZIgR7fI2E4yqTpU');
    // this.getPlaceDetailsByGooglePlaceId2('ChIJGVuc4xGGZIgR7fI2E4yqTpU');
    // this.nearbySearchByGeolocation(35.89872340000001, -86.96240859999999, 'restaurant');
    // this.getPhotoByPlaceId('ChIJGVuc4xGGZIgR7fI2E4yqTpU');
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

  // TESTING -- get saved card place details by Google Place Id
  // getSavedCardPlaceDetails(googlePlaceId) {
  //   this.resultsService.getSavedResultsByGooglePlaceId2(googlePlaceId);
  // }

  // GET DETAILS FOR MY PLACES SAVED/VISITED CARDS (limited data)
  getSavedResultsByGooglePlaceId2(googlePlaceId: string) {
    var request = {
      placeId: googlePlaceId,
      fields: ['place_id', 'name', 'types', 'formatted_address'],
    };

    console.log('Request: ', request);

    let service = new google.maps.places.PlacesService(
      document.getElementById('main').appendChild(document.createElement('div'))
    );

    service.getDetails(request, callback);

    function callback(result, status) {
      // "result" is what returns the PlaceResult object, so we need to assign that data to a variable
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('Callback Results: ', result);
        console.log('Status: ', google.maps.places.PlacesServiceStatus);
      }
    }
  }


  // GET ALL PLACE DETAILS FOR PLACE DETAILS PAGE
  // Full details: place_id, name, types, formatted_address, website, editorial_summary/overview, photos
  getPlaceDetailsByGooglePlaceId2(googlePlaceId: string) {
    var request = {
      placeId: googlePlaceId,
      fields: [
        'place_id',
        'name',
        'types',
        'formatted_address',
        'website',
        'photos',
      ],
      // need to add "editorial_summary" back to this if it'll work?
    };

    console.log('Request: ', request);

    // let service = new google.maps.places.PlacesService(
    //   document.getElementById('main').appendChild(document.createElement('div'))
    // );

    let newPhoto = "";
    let photoList = [];

    let service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.getDetails(request, callback);

    function callback(result, status) {
      // "result" is what returns the PlaceResult object, so we need to assign that data to a variable
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('Callback Results: ', result);
        // console.log('Status: ', google.maps.places.PlacesServiceStatus);

        // Then assign photo URL to variable? How to get the actual photo to use on the page? OR just img/src to the photo links?
        result.photos &&
        result.photos.forEach(photo => {
            newPhoto = photo.getUrl({ maxWidth: 500, maxHeight: 500 });
            photoList.push(newPhoto);
            // console.log(photo.getUrl({ maxWidth: 500, maxHeight: 500 }));
          });
        
        console.log("Photos: ", photoList);
      }
    }
  }

  // GET / Nearby Search (by current geolocation)
  nearbySearchByGeolocation(lat: number, lng: number, searchType: string) {
    // For V2, we can let the user choose the radius
    let searchRadius: number = 35000;

    var location = new google.maps.LatLng(lat, lng);

    var request = {
      location: location,
      radius: searchRadius,
      type: searchType,
    };

    let service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.nearbySearch(request, callback);

    function callback(results, status) {
      // "result" is what returns the PlaceResult object, so we need to assign that data to a variable

      // Do we want to decide on this? Or let the user decide? (keeping in mind the cost of the requests)
      let searchLimit = 3;

      let limitedResults = [];

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('Status: ', google.maps.places.PlacesServiceStatus);
        // console.log('Callback Results: ', results);

        // This is limiting the results that we'll use BUT I don't think it's actually limiting the results that are returned (I don't think we can do that)
        for (var i = 0; i < searchLimit; i++) {
          // How to handle here if "business_status" is not 'operational'? This doesn't work for some reason.
          // if (results[i].business_status == 'OPERATIONAL') {
          //   limitedResults.push(results[i]);
          // }
          limitedResults.push(results[i]);
        }

        console.log('Callback Results: ', limitedResults);
      }
    }
  }

  // GET / Place Photos (for Place Details page)
  // I think we could combine this with the PlaceDetails request AND maybe with the MyPlace Place Details request if it's that easy??
  getPhotoByPlaceId(placeId: string) {

    var request = {
      placeId: placeId,
    };

    let service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    service.getDetails(request, callback);

    function callback(data, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        data.photos &&
          // Do we maybe need to limit the number of photos this calls for? Does this add up?
          data.photos.forEach(photo => {
            console.log(photo.getUrl({ maxWidth: 500, maxHeight: 500 }));
          });
      }
    }
  }

}
