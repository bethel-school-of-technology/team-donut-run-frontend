import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Use for AuthService methods: signup, sign in
  authBaseUrl: string = 'http://localhost:5000/api/auth';

  // User controller url
  userBaseUrl: string = 'http://localhost:5000/api/user';

  tokenKey: string = 'myUserToken';

  public currentUser$ = new Subject<User>();

  constructor(private http: HttpClient) { }

  ////////////// AUTH ENDPOINTS ////////////////

  // POST / sign UP new user
  signUp(newUser: User): Observable<any> {
    return this.http.post(`${this.authBaseUrl}/signup`, newUser);
  }

  // POST / sign IN existing user
  signIn(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.authBaseUrl}/signin`,
        { username, password },
        { responseType: 'text' }
      )
      .pipe(
        tap((response: any) => {
          localStorage.setItem('myUserToken', response);
        })
      );
  }

  // Sign OUT
  signout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUser$.next(null);
    console.log("User signed out.");
  }

  ////////////// USER ENDPOINTS ////////////////

  // GET / get all users -- Not sure if we need this one?

  // GET / get one user by user id

  // GET / get CURRENT user
  getCurrentUser(): Observable<User> {

    if (localStorage.getItem(this.tokenKey) != null) {
      let reqHeaders = {
        Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`,
      };

      return this.http.get<User>(`${this.userBaseUrl}/current`, {
        headers: reqHeaders,
      });
    } else {
      console.error('No users signed in; not able to find a current user.');
      return of(null);
    }
  }

  // PUT / edit user by current user route.
  editCurrentUser(editedUser: User): Observable<User> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.put<User>(`${this.userBaseUrl}/current/edit`, editedUser, {
      headers: reqHeaders,
    });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.userBaseUrl}/forgot-password`, { email });
  }

  validateResetToken(token: string) {
    return this.http.post(`${this.userBaseUrl}/validate-reset-token`, { token });
}

  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post(`${this.userBaseUrl}/reset-password`, { token, password, confirmPassword });
  }

  // DELETE / delete user by user id
}
