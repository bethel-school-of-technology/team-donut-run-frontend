import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceResult } from '../models/place-result';


@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  dataSource: string = 'http://localhost:3000/results';

  constructor(private http: HttpClient) {}

  //Used for testing results mock data - returns everything
  getAllResults(): Observable<PlaceResult[]> {
    return this.http.get<PlaceResult[]>(this.dataSource);
  }

  //Gets the "results" place details for the googlePlaceId - used with Google Place details search
  getResultsByGooglePlaceId(googlePlaceId: string): Observable<PlaceResult> {
    return this.http.get<PlaceResult>(
      this.dataSource + '/' + '?place_id=' + googlePlaceId
    );
  }

  //Can create a new place with user inputs - for testing with mock data
  createNewResults(newPlace: PlaceResult): Observable<PlaceResult> {
    return this.http.post<PlaceResult>(this.dataSource, newPlace);
  }

  //Can edit a place with user inputs - for testing with mock data
  editResultsByGooglePlaceId(
    googlePlaceId: number,
    edittedPlace: PlaceResult
  ): Observable<PlaceResult> {
    return this.http.put<PlaceResult>(
      this.dataSource + '/' + googlePlaceId,
      edittedPlace
    );
  }

  //Can deleate a place  - for testing with mock data
  deleteResultsByGooglePlaceId(googlePlaceId: number): Observable<any> {
    return this.http.delete<any>(this.dataSource + '/' + googlePlaceId);
  }
}
