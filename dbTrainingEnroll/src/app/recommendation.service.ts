import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RecommendationService {

  // private _URL = 'https://db-training-enroll.herokuapp.com/trainings';
  private _URL = 'https://next.json-generator.com/api/json/get/4kH3CMvnE';

  constructor(private http: HttpClient) {
  }

  trainings: Training[];

   getRecommendedTrainings(): Observable<Training[]> {
     return this.http.get<Training[]>(this._URL);
   }

   private handleError(error: Response) {
     return Observable.throw(error.statusText);
   }

}
