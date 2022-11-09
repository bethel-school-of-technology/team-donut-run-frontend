import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyPlace } from '../models/my-place';
@Injectable({
  providedIn: 'root',
})
export class MyPlacesService {
  dataSource: string = 'http://localhost:3000/places';

  constructor(private http: HttpClient) {}

  getAllPlaces(): Observable<MyPlace[]> {
    return this.http.get<MyPlace[]>(this.dataSource);
  }

  getPlaceByID(id: number): Observable<MyPlace> {
    return this.http.get<MyPlace>(this.dataSource + '/' + id);
  }

  createNewPlace(newPlace: MyPlace): Observable<MyPlace> {
    return this.http.post<MyPlace>(this.dataSource, newPlace);
  }

  editPlaceByID(id: number, edittedPlace: MyPlace): Observable<MyPlace> {
    return this.http.put<MyPlace>(this.dataSource + '/' + id, edittedPlace);
  }

  deletePlaceByID(id: number): Observable<any> {
    return this.http.delete<any>(this.dataSource + '/' + id);
  }
}
