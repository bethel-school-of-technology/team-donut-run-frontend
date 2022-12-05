import { Injectable } from '@angular/core';
import { Observable, of, Subject} from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  //variable used to modify dropdown menu
  public active$!: Observable<boolean>;
  public currentUserName: string = "";

  
  constructor() { }

  //method used to modify dropdown menu.
  GetUserActiveState(state: string, username: string): Observable<boolean> {
    if (state === "active") {
      this.currentUserName = username;
      return of(true);
    }
    else {
      return of(false);
    }
  }

  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  // constructor(private http: HttpClient) {
  //   this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')as string));
  //   this.currentUser = this.currentUserSubject.asObservable();
  // }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  // signIn(username: string, password: string) {
  //   return this.http.post<any>(`${this.baseURL}/signin`, { username, password })
  //   .pipe(map(user => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       return user;
  //     }));
  // }
}
