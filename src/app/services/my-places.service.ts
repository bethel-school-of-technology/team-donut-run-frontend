import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyPlace } from '../models/my-place';
@Injectable({
  providedIn: 'root',
})
export class MyPlacesService {
  dataSource: string = 'http://localhost:3000/myplaces';

  constructor(private http: HttpClient) {}

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
