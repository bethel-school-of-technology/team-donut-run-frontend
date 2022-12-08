import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  // Data source for Experiences
  apiDataSource: string = "";

  tokenKey: string = "myUserToken";

  public myExperienceArray$ = new Subject<Experience[]>;

  constructor(private http: HttpClient) { }

  ////////////// BACKEND API ENDPOINTS ////////////////
  // GET / get all current user's experiences -- auth

  // GET / a single experience by experience id -- auth?

  // POST / create a new saved experience -- auth

  // PUT / update a saved experience with completed boolean AND/OR with a different place (V3?) -- auth

  // DELETE / delete a saved experience -- auth
}
