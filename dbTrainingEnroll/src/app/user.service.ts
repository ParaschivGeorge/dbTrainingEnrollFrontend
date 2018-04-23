import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from './training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from './user';
import { PmFormResponse } from './enrollments/pm-form/pm-from-response';
import { AuthService } from './auth.service';
import { Userdata } from './auth/login/userData';

@Injectable()
export class UserService {
  private _BASE_URL =  'https://db-training-enroll.herokuapp.com';
  private _ENROLL_URL = this._BASE_URL + '/subordinates';
  private _RESULT_ULR = this._BASE_URL + '/subordinatesResult';
  private _PENDING_ULR = this._BASE_URL + '/pendingUsers';
  private _PENDING_RESULT_ULR = this._BASE_URL + '/approveList';
  private _USER_DATA_URL = this._BASE_URL + '/getUserData';

  training: Training;
  accounts: User[] = [];
  data: Object;
  modelList: Array<PmFormResponse>;
  closeDialog = new EventEmitter<boolean>();

  currentUser = new User;

  constructor(private http: HttpClient,
    spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService) {}

  getEnrollmentsList(): Observable<User[]> {
    return this.http.post<User[]>(this._ENROLL_URL, {email: this.currentUser.email, id: this.training.id});
  }

  getPendingList(): Observable<User[]> {
    return this.http.post<User[]>(this._PENDING_ULR, {email: this.currentUser.email, id: this.training.id});
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

  postUserData(): Observable<Userdata> {
    return this.http.post<Userdata>(this._USER_DATA_URL, {email: this.currentUser.email});
  }
}
