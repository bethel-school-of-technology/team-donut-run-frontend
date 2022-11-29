import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { from, Observable } from 'rxjs';
// import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  geoUrl: string = "https://geocode.maps.co/search?";

  constructor(private http: HttpClient) { }

  getCurrentPosition(): Observable<Position> {
    return from(Geolocation.getCurrentPosition());
};

  ///// USING FREE GEOLOCATION API /////////
  getLocationData(cityInput: string, stateInput: string): Observable<any> {
    let params = {
      city: cityInput,
      state: stateInput
    }

    return this.http.get<any>(this.geoUrl, { params: params });
  }


}
