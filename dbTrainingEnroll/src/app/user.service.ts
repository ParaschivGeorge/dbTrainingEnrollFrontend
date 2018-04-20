import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from './user';

@Injectable()
export class UserService {

  private _ENROLL_URL = 'https://db-training-enroll.herokuapp.com/subordinates';
  private _RESULT_ULR = 'https://db-training-enroll.herokuapp.com/subordinatesResult';

  constructor(private http: HttpClient, spinnerService: Ng4LoadingSpinnerService) {}

  // getTrainings(): Observable<Training[]> {
  //   return this.http.get<Training[]>(this._URL);
  // }

  getEnrollmentsList(): Observable<User[]> {
    return this.http.post<User[]>(this._ENROLL_URL, {email:"garyjb@verizon.net",id: this.training.id});
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  currentUser = {
      name: 'Manager',
      email: 'manager@gmail.com'
  };

  postEnrollmentsList(data){
    this.http.post(this._RESULT_ULR, data);
  }

  training: Training;
  accounts: User[] = [];
}
