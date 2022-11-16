import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceResult } from '../models/place-result';

import {} from 'googlemaps';
import { GooglePlaceModule } from 'googlemaps';
// not sure if we need this

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  dataSource: string = 'http://localhost:3000/results';

  geocodeUrl: string = "https://geocode.maps.co/search?";
  
  constructor(private http: HttpClient) {}  

  // If we wanted to add the API endopints to the service, could we just initiate the service in the .ts file? Not sure...

  ////////////// MOCK DATA TEST ENDPOINTS ////////////////

  // GET / Place Details search (for MyPlaces page)
  // Limited details, return: place_id, name, types

  // This one is used for mock data
  getSavedResultsByGooglePlaceId(googlePlaceId: string): Observable<PlaceResult> {
    return this.http.get<PlaceResult>(
      this.dataSource + '/' + '?place_id=' + googlePlaceId
    );
  }

  // GET / Place Details (for Place Details page)
  // Full details: place_id, name, types, formatted_address, website, editorial_summary/overview, photos
  getPlaceDetailsByGooglePlaceId(googlePlaceId: string): Observable<PlaceResult> {
    return this.http.get<PlaceResult>(`${this.dataSource}/?place_id=${googlePlaceId}`);
  }

  // GET / all Place Results from mock data
  getAllResults(): Observable<PlaceResult[]> {
    return this.http.get<PlaceResult[]>(this.dataSource);
  }

  // POST / add new place to mock data
  createNewResults(newPlace: PlaceResult): Observable<PlaceResult> {
    return this.http.post<PlaceResult>(this.dataSource, newPlace);
  }

  // PUT / edit a place with user inputs
  editResultsByGooglePlaceId(
    googlePlaceId: number,
    edittedPlace: PlaceResult
  ): Observable<PlaceResult> {
    return this.http.put<PlaceResult>(
      this.dataSource + '/' + googlePlaceId,
      edittedPlace
    );
  }

  // DELETE / delete a place that was added to mock data
  deleteResultsByGooglePlaceId(googlePlaceId: number): Observable<any> {
    return this.http.delete<any>(this.dataSource + '/' + googlePlaceId);
  }

  ////////////// GEOCODER ENDPOINTS ////////////////
  // NOTE: Will need to build out different model for response

  // GET / lat/long by USA postal code

  // GET / lat/long by city, state

  // GET / lat/long by city, country (need to map country codes)

  // GET / reverse geocode, get details from lat/long


  ////////////// GOOGLE API ENDPOINTS //////////////// 
  // Moving here for now to merge, then will put in appropriate page files

  // For ngOnInIt testing:
    // console.log(this.getSavedResultsByGooglePlaceId2('ChIJGVuc4xGGZIgR7fI2E4yqTpU'));
    // this.getPlaceDetailsByGooglePlaceId2('ChIJGVuc4xGGZIgR7fI2E4yqTpU');
    // this.nearbySearchByGeolocation(35.89872340000001, -86.96240859999999, 'restaurant');
    // this.getPhotoByPlaceId('ChIJGVuc4xGGZIgR7fI2E4yqTpU');

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

    // console.log('Request: ', request);

    let service = new google.maps.places.PlacesService(
      document.getElementById('main').appendChild(document.createElement('div'))
    );

    service.getDetails(request, callback);

    function callback(result, status) {
      // "result" is what returns the PlaceResult object, so we need to assign that data to a variable
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // console.log('Callback Results: ', result);
        let currentPlaceDetails2 = result;
        console.log("Current Place: ", currentPlaceDetails2);
        // console.log('Status: ', google.maps.places.PlacesServiceStatus);
        
        return currentPlaceDetails2;
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

  // // GET / Nearby Search (by current geolocation)
  // nearbySearchByGeolocation(lat: number, lng: number, searchType: string) {
  //   // For V2, we can let the user choose the radius
  //   let searchRadius: number = 35000;

  //   var location = new google.maps.LatLng(lat, lng);

  //   var request = {
  //     location: location,
  //     radius: searchRadius,
  //     type: searchType,
  //   };

  //   let service = new google.maps.places.PlacesService(
  //     document.createElement('div')
  //   );

  //   service.nearbySearch(request, callback);

  //   function callback(results, status) {
  //     // "result" is what returns the PlaceResult object, so we need to assign that data to a variable

  //     // Do we want to decide on this? Or let the user decide? (keeping in mind the cost of the requests)
  //     let searchLimit = 3;

  //     let limitedResults = [];

  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       console.log('Status: ', google.maps.places.PlacesServiceStatus);
  //       // console.log('Callback Results: ', results);

  //       // This is limiting the results that we'll use BUT I don't think it's actually limiting the results that are returned (I don't think we can do that)
  //       for (var i = 0; i < searchLimit; i++) {
  //         // How to handle here if "business_status" is not 'operational'? This doesn't work for some reason.
  //         // if (results[i].business_status == 'OPERATIONAL') {
  //         //   limitedResults.push(results[i]);
  //         // }
  //         limitedResults.push(results[i]);
  //       }

  //       console.log('Callback Results: ', limitedResults);
  //     }
  //   }
  // }

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



