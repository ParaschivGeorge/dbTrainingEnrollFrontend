import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ReportsService {

  private _POP_URL = 'https://db-training-enroll.herokuapp.com/topAllAttendees';
  private _SOFT_POP_URL = 'https://db-training-enroll.herokuapp.com/topSoftAttendees';
  private _TECH_POP_URL = 'https://db-training-enroll.herokuapp.com/topTechnicalAttendees';

  constructor(private http: HttpClient) { }

  getPopularity() {
    return this.http.get(this._POP_URL).map(result => result);
  }

  getTechPopularity() {
    return this.http.get(this._TECH_POP_URL).map(result => result);
  }

  getSoftPopularity() {
    return this.http.get(this._SOFT_POP_URL).map(result => result);
  }

}
