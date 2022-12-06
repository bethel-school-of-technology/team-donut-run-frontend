import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonutShop } from '../models/donut-shop';

@Injectable({
  providedIn: 'root'
})

export class DonutShopService {
  baseURL: string = "http://localhost:5000/api/donutshop"

  constructor(private http: HttpClient) { }

  getDonutShopById(donutShopId: string) {
    return this.http.get<DonutShop>(this.baseURL + "/" + donutShopId);
  }
}
