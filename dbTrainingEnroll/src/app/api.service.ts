import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  private _URL = 'http://www.json-generator.com/api/json/get/cqmUiCcGKW?indent=2';

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

   private handleError(error: Response) {
     return Observable.throw(error.statusText);
   }

}
