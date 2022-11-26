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

  // GET / a single my place by my place id -- NO auth
  // I'm not sure we'll actually use this?
  getMyPlaceByMyPlaceId(myPlaceId: string): Observable<MyPlace> {
    return this.http.get<MyPlace>(`${this.apiDataSource}/${myPlaceId}`);
  }

  // GET / a single my place by current user and google place id -- auth
  getPlaceByUserIdGoogleId(googlePlaceId: string): Observable<MyPlace> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<MyPlace>(`${this.apiDataSource}/find/current-user/${googlePlaceId}`, { headers: reqHeaders });
  }

  // POST / create a new saved my place -- auth
  saveNewMyPlace(newPlace: MyPlace): Observable<MyPlace> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.post<MyPlace>(this.apiDataSource, newPlace, { headers: reqHeaders });
  }

  // PUT / update a saved my place with visited boolean -- auth
  updateMyPlace(editPlace: MyPlace): Observable<MyPlace> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.put<MyPlace>(`${this.apiDataSource}/edit/${editPlace.myPlaceId}`, editPlace, { headers: reqHeaders });
  }

  // DELETE / delete saved my place -- auth
  deleteMyPlaceByPlaceId(myPlaceId: number): Observable<any> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.delete<any>(`${this.apiDataSource}/${myPlaceId}`, { headers: reqHeaders });
  }

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
