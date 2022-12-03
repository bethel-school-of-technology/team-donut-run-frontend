import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  //variable used to modify dropdown menu
  public active$!: Observable<boolean>;
  public currentUser: string = "";

  constructor() { }

  //method used to modify dropdown menu.
  GetUserActiveState(state: string, username: string): Observable<boolean> {
    if (state === "active") {
      this.currentUser = username;
      return of(true);
    }
    else {
      return of(false);
    }
  }
}
