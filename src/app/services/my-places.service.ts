import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyPlace } from '../models/my-place';
@Injectable({
  providedIn: 'root',
})
export class MyPlacesService {
  
  // For MOCK data
  dataSource: string = 'http://localhost:3000/myplaces';

  // For API data
  apiDataSource: string = "http://localhost:5000/api/myplace";

  tokenKey: string = "myUserToken";

  constructor(private http: HttpClient) {}

  ////////////// BACKEND API ENDPOINTS ////////////////
  // GET / get all current user's my places -- auth
  getAllCurrentUserPlaces(): Observable<MyPlace[]> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<MyPlace[]>(`${this.apiDataSource}/user/current`,{ headers: reqHeaders });
  }

  // GET / a single my place by my place id 

  // GET / a single my place by user id and google place id -- auth

  // POST / create a new saved my place -- auth

  // PUT / update a saved my place with visited boolean -- auth

  // DELETE / delete saved my place -- auth

  ////////////// MOCK DATA TEST ENDPOINTS ////////////////

  getAllPlaces(): Observable<MyPlace[]> {
    return this.http.get<MyPlace[]>(this.dataSource);
  }
  getPlacesByUserId(userId: number): Observable<MyPlace[]> {
    return this.http.get<MyPlace[]>(this.dataSource + '/?userId=' + userId);
  }
  getPlaceByGoogleId(googleId: string): Observable<MyPlace> {
    return this.http.get<MyPlace>(this.dataSource + '/' + googleId);
  }
  saveNewPlace(newPlace: MyPlace): Observable<MyPlace> {
    return this.http.post<MyPlace>(this.dataSource, newPlace);
  }
  editPlaceByPlaceId(
    placeId: number,
    editedPlace: MyPlace
  ): Observable<MyPlace> {
    return this.http.put<MyPlace>(this.dataSource + '/' + placeId, editedPlace);
  }
  deletePlaceByPlaceId(placeId: number): Observable<any> {
    return this.http.delete<any>(this.dataSource + '/' + placeId);
  }


}
