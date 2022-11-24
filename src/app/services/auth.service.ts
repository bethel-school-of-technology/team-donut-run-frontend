import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Use for AuthService methods: signup, sign in
  authBaseUrl: string = 'http://localhost:5000/api/auth';
  tokenKey: string = 'myUserToken';

  constructor(private http: HttpClient) {}

  signUp(newUser: User): Observable<any> {
    return this.http.post(`${this.authBaseUrl}/signup`, newUser);
  }

  signIn(username: string, password: string): Observable<any> {
       return this.http.post(`${this.authBaseUrl}/signin`, {username, password}, {responseType: 'text'})
      .pipe(tap((response: any) => {
        localStorage.setItem('myUserToken', response);
      }));
  }

  signout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}


