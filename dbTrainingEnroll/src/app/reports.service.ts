import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ReportsService {

  private _POP_URL = 'https://db-training-enroll.herokuapp.com/topAllAttendees';
  private _SOFT_POP_URL = 'https://db-training-enroll.herokuapp.com/topSoftAttendees';
  private _TECH_POP_URL = 'https://db-training-enroll.herokuapp.com/topTechnicalAttendees';
  private _GENDER_URL = 'https://db-training-enroll.herokuapp.com/genderStats';
  private _SvT_URL = 'https://db-training-enroll.herokuapp.com/attendedTrainings';
  private _MONTH_URL = 'https://db-training-enroll.herokuapp.com/reportByMonth';

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

  getGender() {
    return this.http.get(this._GENDER_URL).map(result => result);
  }

  getSoftTech() {
    return this.http.get(this._SvT_URL).map(result => result);
  }

  getSoftTechMonth() {
    return this.http.get(this._MONTH_URL).map(result => result);
  }

}
