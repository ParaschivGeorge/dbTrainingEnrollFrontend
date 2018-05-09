import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {Training} from "../../training";

@Component({
  selector: 'app-show-trainings',
  templateUrl: './show-trainings.component.html',
  styleUrls: ['./show-trainings.component.scss']
})
export class ShowTrainingsComponent implements OnInit {

  trainings: Training[];

  constructor(private spinnerService: Ng4LoadingSpinnerService,
              private apiService: ApiService) { }

  getTrainings(): void {
    this.spinnerService.show();
    this.apiService.getTrainings()
      .subscribe(
        result => {
          this.trainings = result;
          this.spinnerService.hide();
        }
      );
  }

  ngOnInit() {
    this.getTrainings();
  }

}
