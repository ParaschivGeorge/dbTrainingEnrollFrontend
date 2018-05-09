import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from '../models/training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecommendationService {

  // private _URL = 'https://db-training-enroll.herokuapp.com/trainings';
  private _URL = 'https://db-training-enroll.herokuapp.com/recommend';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  trainings: Training[];
  gotRecommendations = new EventEmitter<boolean>();
  private subject = new Subject<Training[]>( );


  getRecommendedTrainings(): Observable<Training[]> {
    return this.http.post<Training[]>(this._URL, {email: this.userService.currentUser.email});
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  sendTrainings() {
    this.subject.next(this.trainings);
  }

  getTrainings(): Observable<Training[]> {
    return this.subject.asObservable();
  }
}
