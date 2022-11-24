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
  
  // For Mock Data
  dataSource: string = 'http://localhost:3000/results';

  // For free geocoder
  geocodeUrl: string = "https://geocode.maps.co/search?";
  
  constructor(private http: HttpClient) {}  

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


}



