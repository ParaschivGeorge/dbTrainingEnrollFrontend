import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  private _URL = 'https://next.json-generator.com/api/json/get/EkTaDIen4';
  private _ENROLL_URL = 'https://next.json-generator.com/api/json/get/V1NGMrbh4';

  constructor(private http: Http) {
   }

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
