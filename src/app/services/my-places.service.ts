import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyPlaces } from '../models/my-place';
@Injectable({
  providedIn: 'root',
})
export class MyPlacesService {
  dataSource: string = 'http://localhost:3000/places';

  constructor(private http: HttpClient) {}

  getAllPlaces(): Observable<MyPlaces[]> {
    return this.http.get<MyPlaces[]>(this.dataSource);
  }

  getPlaceByID(id: number): Observable<MyPlaces> {
    return this.http.get<MyPlaces>(this.dataSource + '/' + id);
  }

  createNewPlace(newPlace: MyPlaces): Observable<MyPlaces> {
    return this.http.post<MyPlaces>(this.dataSource, newPlace);
  }

  editPlaceByID(id: number, edittedPlace: MyPlaces): Observable<MyPlaces> {
    return this.http.put<MyPlaces>(this.dataSource + '/' + id, edittedPlace);
  }

  deletePlaceByID(id: number): Observable<any> {
    return this.http.delete<any>(this.dataSource + '/' + id);
  }
}
