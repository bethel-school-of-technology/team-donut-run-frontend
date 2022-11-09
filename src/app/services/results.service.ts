import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceResult } from '../models/place-result';


@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  dataSource: string = 'http://localhost:3000/results';

  constructor(private http: HttpClient) {}

  getAllResults(): Observable<PlaceResult[]> {
    return this.http.get<PlaceResult[]>(this.dataSource);
  }

  getResultsByID(id: number): Observable<PlaceResult> {
    return this.http.get<PlaceResult>(this.dataSource + '/' + id);
  }

  createNewResults(newPlace: PlaceResult): Observable<PlaceResult> {
    return this.http.post<PlaceResult>(this.dataSource, newPlace);
  }

  editResultsByID(id: number, edittedPlace: PlaceResult): Observable<PlaceResult> {
    return this.http.put<PlaceResult>(this.dataSource + '/' + id, edittedPlace);
  }

  deleteResultsByID(id: number): Observable<any> {
    return this.http.delete<any>(this.dataSource + '/' + id);
  }
}
