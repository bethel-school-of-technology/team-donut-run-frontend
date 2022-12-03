import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  //variable used to modify dropdown menu
  public active$!: Observable<boolean>;

  constructor() { }

  //method used to modify dropdown menu.
  GetUserActiveState(state: string): Observable<boolean> {
    if (state === "active") {
      return of(true);
    }
    else {
      return of(false);
    }
  }
}
