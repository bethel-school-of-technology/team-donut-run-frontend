import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Use for AuthService methods: signup, sign in
  authBaseUrl: string = 'http://localhost:5000/api/auth/';
  tokenKey: string = 'myUserToken';

  constructor(private http: HttpClient) {}

  signup(newUser: User): Observable<any> {
    return this.http.post(`${this.authBaseUrl}/signup`, newUser);
  }

  signin(username: string, password: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('password', password);
    return this.http
      .get(`${this.authBaseUrl}/signin`, { params: queryParams, responseType: 'text' })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('myUserToken', response);
        })
      );
  }

  signout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}


