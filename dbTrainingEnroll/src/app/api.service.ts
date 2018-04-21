import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class ApiService {

  private _URL = 'https://db-training-enroll.herokuapp.com/trainings/';
  // private _URL = 'https://next.json-generator.com/api/json/get/N1qt3EE24';
  private _ENROLL_URL = 'https://next.json-generator.com/api/json/get/V1NGMrbh4';

  constructor(private http: Http, spinnerService: Ng4LoadingSpinnerService) {
  }

  trainings: Training[];

   getTrainings(): Observable<Training[]> {
     return this.http
     .get(this._URL)
     .map((response: Response) => {
        return <Training[]>response.json();
     })
     .catch(this.handleError);
   }

   getEnrollmentsList(): Observable<Training[]> {
    return this.http
    .get(this._ENROLL_URL)
    .map((response: Response) => {
       return <Training[]>response.json();
    })
    .catch(this.handleError);
  }

   private handleError(error: Response) {
     return Observable.throw(error.statusText);
   }

}
