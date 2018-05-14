import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Training } from '../models/training';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from '../models/user';
import { SpocFormResponse } from '../enrollments/spoc-form/spoc-form-response';
import { AuthService } from './auth.service';
import { UserDto } from '../models/userDto';
import { EnrollmentDetailsDto } from '../models/enrollmentDetailsDto';

@Injectable()
export class UserService {
  private _BASE_URL =  'https://db-training-enroll.herokuapp.com';
  private _ENROLL_URL = this._BASE_URL + '/subordinates';
  private _RESULT_ULR = this._BASE_URL + '/subordinatesResult';
  private _PENDING_ULR = this._BASE_URL + '/pendingUsers';
  private _PENDING_RESULT_ULR = this._BASE_URL + '/approveList';
  private _USER_DATA_URL = this._BASE_URL + '/getUserData';
  private _SELF_ENROLL_URL = this._BASE_URL + '/userSelfEnroll';
  private _SELF_ENROLLED_USERS_URL = this._BASE_URL + '/getSelfEnrolled';
  private _NEW_NOTIFICATIONS_URL = this._BASE_URL + '/getNewNotifications';
  private _ALL_NOTIFICATIONS_URL = this._BASE_URL + '/getAllNotifications';
  private _INSERT_TRAININGS_URL = this._BASE_URL + '/insertTrainings';
  private _DELETE_TRAININGS_URL = this._BASE_URL + '/deleteTrainings';

  training: Training;
  accounts: UserDto[] = [];
  data: Object;
  modelList: Array<SpocFormResponse>;
  closeDialog = new EventEmitter<boolean>();
  loggedIn = new EventEmitter<boolean>();
  currentUser = new User;
  enrollmentList: EnrollmentDetailsDto[] = [];
  newNoticationsList: Notification[] = [];
  allNoticationsList: Notification[] = [];
  newTrainingsList: Training[] = [];
  deleteTrainingsIdList: number[] = [];

  constructor(private http: HttpClient,
    spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService) {}

  getEnrollmentsList(): Observable<UserDto[]> {
    return this.http.post<UserDto[]>(this._ENROLL_URL, {email: this.currentUser.email, id: this.training.id});
  }

  getPendingList(): Observable<EnrollmentDetailsDto[]> {
    return this.http.post<EnrollmentDetailsDto[]>(this._PENDING_ULR, {email: this.currentUser.email, id: this.training.id});
  }

  postPendingList(): Observable<Object> {
    return this.http.post(this._PENDING_RESULT_ULR, this.modelList);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  postEnrollmentsList(): Observable<Object> {
    console.log(this.data);
    return this.http.post(this._RESULT_ULR, this.data);
  }

  postUserData(): Observable<UserDto> {
    return this.http.post<UserDto>(this._USER_DATA_URL, {email: this.currentUser.email});
  }

  postUserSelfEnroll(): Observable<Object> {
    return this.http.post(this._SELF_ENROLL_URL, {email: this.currentUser.email, id: this.training.id});
  }

  getSelfEnrolledList(): Observable<UserDto[]> {
    return this.http.post<UserDto[]>(this._SELF_ENROLLED_USERS_URL, {email: this.currentUser.email, id: this.training.id});
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.post<Notification[]>(this._ALL_NOTIFICATIONS_URL, {email: this.currentUser.email});
  }

  getNewNotifications(): Observable<Notification[]> {
    return this.http.post<Notification[]>(this._NEW_NOTIFICATIONS_URL, {email: this.currentUser.email});
  }

  insertNewTrainings(): Observable<Training[]> {
    return this.http.post<Training[]>(this._INSERT_TRAININGS_URL, this.newTrainingsList);
  }

  deleteTrainings(): Observable<number[]> {
    return this.http.post<number[]>(this._DELETE_TRAININGS_URL, this.deleteTrainingsIdList);
  }
}
