import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private _BASE_URL = 'https://db-training-enroll.herokuapp.com';

  AccessToken = '';
  constructor(private http: HttpClient) {}

  login(Username: string, Password: string) {
    const headersPost = new HttpHeaders({'Content-Type': 'application/json'});
    const data = JSON.stringify({ username: Username, password: Password });

    console.log('auth service data ' + data);

    return this.http.post(this._BASE_URL  + '/auth', data, {headers: headersPost});
  }
}
