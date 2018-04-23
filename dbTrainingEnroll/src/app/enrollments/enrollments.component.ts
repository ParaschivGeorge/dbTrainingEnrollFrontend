import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Training } from '../training';
import { PmFormComponent } from './pm-form/pm-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['../dashboard/dashboard.component.scss'],
  providers: [ApiService]
})
export class EnrollmentsComponent implements OnInit {
  trainings: Training[];
  originalTrainings: Training[];

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    private userService: UserService,
    private spinnerService: Ng4LoadingSpinnerService) { }

  getEnrollmentsList(): void {
    this.spinnerService.show();
    this.apiService.getEnrollmentsList()
    .subscribe(
      result => this.trainings = result,
      error => console.log(error));
      this.spinnerService.hide();
  }

  openDialog(training: Training): void {
    this.userService.training = training;
    console.log(this.userService.training.id);
    this.userService.getPendingList().subscribe(result => {}, error => {});
    this.userService.closeDialog.subscribe(result => this.dialog.closeAll());
    const dialogRef = this.dialog.open(PmFormComponent, {
    });
  }

  onScrollDown() {
    this.spinnerService.show();
    if (this.trainings.length < this.originalTrainings.length - 4) {
      const len = this.trainings.length;
      console.log(len);

      for (let i = len; i <= len + 4; i ++) {
        this.trainings.push(this.originalTrainings[i]);
      }
    }

    for (let j = this.trainings.length; j <= this.originalTrainings.length - 1; j ++) {
      this.trainings.push(this.originalTrainings[j]);
    }
    this.spinnerService.hide();
  }

  ngOnInit() {
    this.getEnrollmentsList();
  }

}
