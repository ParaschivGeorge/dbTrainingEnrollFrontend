import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class RecommendationService {

  // private _URL = 'https://db-training-enroll.herokuapp.com/trainings';
  private _URL = 'https://db-training-enroll.herokuapp.com/recommend';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  trainings: Training[];
  gotRecommendations = new EventEmitter<boolean>();

   getRecommendedTrainings(): Observable<Training[]> {
     return this.http.post<Training[]>(this._URL, {email: this.userService.currentUser.email});
   }

   private handleError(error: Response) {
     return Observable.throw(error.statusText);
   }

}
