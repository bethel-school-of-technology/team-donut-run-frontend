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
}
