import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from './user';
import { PmFormResponse } from './enrollments/pm-form/pm-from-response';

@Injectable()
export class UserService {

  private _ENROLL_URL = 'https://db-training-enroll.herokuapp.com/subordinates';
  private _RESULT_ULR = 'https://db-training-enroll.herokuapp.com/subordinatesResult';
  private _PENDING_ULR = 'https://db-training-enroll.herokuapp.com/pendingUsers';
  private _PENDING_RESULT_ULR = 'https://db-training-enroll.herokuapp.com/approveList';

  training: Training;
  accounts: User[] = [];
  data: Object;
  modelList: Array<PmFormResponse>;
  closeDialog = new EventEmitter<boolean>();

  currentUser = {
    name: 'Manager',
    email: 'manager@gmail.com'
  };

  constructor(private http: HttpClient, spinnerService: Ng4LoadingSpinnerService) {}

  getEnrollmentsList(): Observable<User[]> {
    return this.http.post<User[]>(this._ENROLL_URL, {email: 'garyjb@verizon.net', id: this.training.id});
  }

  getPendingList(): Observable<User[]> {
    return this.http.post<User[]>(this._PENDING_ULR, {email: 'twoflower@optonline.net', id: this.training.id});
  }

  postPendingList(): Observable<Object> {
    return this.http.post(this._PENDING_RESULT_ULR, this.modelList);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  postEnrollmentsList(): Observable<Object> {
    return this.http.post(this._RESULT_ULR, this.data);
  }
}
