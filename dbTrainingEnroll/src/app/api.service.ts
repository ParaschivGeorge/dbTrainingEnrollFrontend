import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from './user.service';

@Injectable()
export class ApiService {

  private _URL = 'https://db-training-enroll.herokuapp.com/trainings';
  // private _URL = 'https://next.json-generator.com/api/json/get/N1qt3EE24';
  private _ENROLL_URL = 'https://db-training-enroll.herokuapp.com/pendingTrainings';

  constructor(private http: HttpClient, spinnerService: Ng4LoadingSpinnerService, private userService: UserService) {
  }

  trainings: Training[];

   getTrainings(): Observable<Training[]> {
     return this.http.get<Training[]>(this._URL);
   }

   getEnrollmentsList(): Observable<Training[]> {
    return this.http.post<Training[]>(this._ENROLL_URL, {email: this.userService.currentUser.email});
  }

   private handleError(error: Response) {
     return Observable.throw(error.statusText);
   }

}
