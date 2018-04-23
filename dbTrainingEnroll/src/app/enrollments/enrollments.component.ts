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
  allTrainings: Training[];
  softTrainings: Training[];
  allSoftTrainings: Training[];
  techTrainings: Training[];
  allTechTrainings: Training[];
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
      result => {
        this.originalTrainings = result,
        this.allTrainings = this.originalTrainings.slice(0, 8),
        this.allSoftTrainings = this.originalTrainings.filter(data => data.categoryType === 'SOFT'),
        this.softTrainings = this.allSoftTrainings.slice(0, 8),
        this.allTechTrainings = this.originalTrainings.filter(data => data.categoryType === 'TECHNICAL'),
        this.techTrainings = this.allTechTrainings.slice(0, 8);
        this.spinnerService.hide();
      } ,
      error => console.log('Error: ' + error)
    );
  }

  openDialog(training: Training): void {
    this.userService.training = training;
    console.log(this.userService.training.id);
    this.userService.getPendingList().subscribe(result => {}, error => {});
    this.userService.closeDialog.subscribe(result => this.dialog.closeAll());
    const dialogRef = this.dialog.open(PmFormComponent, {
    });
  }

  onScrollDown(all: Training[], original: Training[]) {
    this.spinnerService.show();
    if (all.length < original.length - 4) {
      const len = all.length;
      console.log(len);

      for (let i = len; i <= len + 4; i ++) {
        all.push(original[i]);
      }
    }

    for (let j = all.length; j <= original.length - 1; j ++) {
      all.push(original[j]);
    }
    this.spinnerService.hide();
  }

  ngOnInit() {
    this.getEnrollmentsList();
  }

}
