import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceResult } from '../models/place-result';
// import { map } from 'rxjs/operators';

// import { Loader } from "@googlemaps/js-api-loader"

import {} from 'googlemaps';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  dataSource: string = 'http://localhost:3000/results';

  geocodeUrl: string = "https://geocode.maps.co/search?";

  
  // infowindow: google.maps.InfoWindow;

  // loader = new Loader({
  //   apiKey: "AIzaSyBAfqHiiucNbsPmmV3hPYaqU_W7ernJ0ms",
  //   version: "weekly",
  //   libraries: ["places"]
  // });
  
  constructor(private http: HttpClient) {}

  ////////////// GOOGLE PLACES API ENDPOINTS ////////////////

  // GET / Place Details search (for MyPlaces page)
  // Limited details, return: place_id, name, types
  getSavedResultsByGooglePlaceId(googlePlaceId: string): Observable<PlaceResult> {
    return this.http.get<PlaceResult>(
      this.dataSource + '/' + '?place_id=' + googlePlaceId
    );
  }

  getSavedResultsByGooglePlaceId2() {
    var request = {
      placeId: "",
      fields: ['place_id', 'name', 'types']
    };

    var service: google.maps.places.PlacesService;

    service.getDetails(request, this.callback);
  }
  
  // GET / Place Details (for Place Details page)
  // Full details: place_id, name, types, formatted_address, website, editorial_summary/overview, photos
  getPlaceDetailsByGooglePlaceId(googlePlaceId: string): Observable<PlaceResult> {
    return this.http.get<PlaceResult>(`${this.dataSource}/?place_id=${googlePlaceId}`);
  }

  // GET / Place Photos (for Place Details page)
  // function createPhotoMarker(place) {
  //   var photos = place.photos;
  //   if (!photos) {
  //     return;
  //   }
  
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location,
  //     title: place.name,
  //     icon: photos[0].getUrl({maxWidth: 35, maxHeight: 35})
  //   });
  // }

  // GET / Nearby Search (by current geolocation)
  lat: number = 35.89872340000001;
  lng: number = -86.96240859999999;
  searchRadius: number = 35000;
  searchType: string = "restaurant";

  nearbySearchByGeolocation() {
    var location = new google.maps.LatLng(this.lat,this.lng);

    var request = {
      location: location,
      radius: this.searchRadius,
      type: this.searchType
    };

    var service: google.maps.places.PlacesService;

    service.nearbySearch(request, this.callback);
  }

  // Necessary to return PlacesServiceStatus callback requirement
  callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        console.log("Callback Results: ", results[i]);
        console.log("Status: ", google.maps.places.PlacesServiceStatus);
      }
    }
  }
  
  


  // GET / Nearby Search (by search string / zip code) -- V2

  // TESTING




  ////////////// GEOCODER ENDPOINTS ////////////////
  // NOTE: Will need to build out different model for response

  // GET / lat/long by USA postal code

  // GET / lat/long by city, state

  // GET / lat/long by city, country (need to map country codes)

  // GET / reverse geocode, get details from lat/long


  ////////////// MOCK DATA TEST ENDPOINTS ////////////////

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
}
