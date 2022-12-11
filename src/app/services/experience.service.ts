import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  // Data source for Experiences
  apiDataSource: string = "http://localhost:5000/api/experiences";

  tokenKey: string = "myUserToken";

  public myExperienceArray$ = new Subject<Experience[]>;

  constructor(private http: HttpClient) { }

  ////////////// BACKEND API ENDPOINTS ////////////////
  // GET / get all experiences
  getAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiDataSource}/all`);
  }

  // GET / get all current user's experiences -- auth
  getAllCurrentUserExperiences(): Observable<Experience[]> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<Experience[]>(`${this.apiDataSource}/user/current`, { headers: reqHeaders });
  }

  // GET / all experiences by user id -- auth
  getExperiencesByUserId(userId: number): Observable<Experience[]> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<Experience[]>(`${this.apiDataSource}/all/${userId}`, { headers: reqHeaders });
  }

  // GET / a single experience by experience id -- auth?
  getExperienceById(experienceId: number): Observable<Experience> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.get<Experience>(`${this.apiDataSource}/${experienceId}`, { headers: reqHeaders });
  }

  // POST / create a new saved experience -- auth
  createNewExperience(newExperience: Experience): Observable<Experience> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.post<Experience>(this.apiDataSource, newExperience, { headers: reqHeaders });
  }

  // PUT / update a saved experience with completed boolean AND/OR with a different place (V3?) -- auth
  updateExperience(editExperience: Experience): Observable<Experience> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.put<Experience>(`${this.apiDataSource}/edit/${editExperience.experienceId}`, editExperience, { headers: reqHeaders });
  }

  // DELETE / delete a saved experience -- auth
  deleteExperienceById(experienceId: number): Observable<any> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };

    return this.http.delete<any>(`${this.apiDataSource}/${experienceId}`, { headers: reqHeaders });
  }
}
