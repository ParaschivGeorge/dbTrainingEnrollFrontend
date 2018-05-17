import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from '../models/training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from './user.service';

@Injectable()
export class ApiService {

  private _ADMIN_URL = 'https://db-training-enroll.herokuapp.com/trainingsAdmin';
  private _TRAININGS_URL = 'https://db-training-enroll.herokuapp.com/trainings';
  private _BASE_URL =  'https://db-training-enroll.herokuapp.com';
  // private _URL = 'https://next.json-generator.com/api/json/get/N1qt3EE24';
  private _ENROLL_URL = this._BASE_URL +  '/pendingTrainings';
  private _USER_TRAININGS = this._BASE_URL + '/myTrainings';

  constructor(private http: HttpClient, spinnerService: Ng4LoadingSpinnerService, private userService: UserService) {
  }

  trainings: Training[];

   getTrainings(): Observable<Training[]> {
     return this.http.get<Training[]>(this._TRAININGS_URL);
   }

   getTrainingsByPage(page: Number, size: Number): Observable<Training[]> {
    return this.http.get<Training[]>(this._TRAININGS_URL + '?page=' + page + '&size=' + size);
  }

   getAdminTrainings(): Observable<Training[]> {
     return this.http.get<Training[]>(this._ADMIN_URL);
   }

   getEnrollmentsList(): Observable<Training[]> {
    return this.http.post<Training[]>(this._ENROLL_URL, {email: this.userService.currentUser.email});
  }

   private handleError(error: Response) {
     return Observable.throw(error.statusText);
   }

   getUserTrainings(): Observable<Training[]> {
     return this.http.post<Training[]>(this._USER_TRAININGS, {email: this.userService.currentUser.email});
   }

}
