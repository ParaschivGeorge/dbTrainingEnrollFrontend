import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Training } from '../models/training';
import { SpocFormComponent } from './spoc-form/spoc-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['../dashboard/dashboard.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateY(40%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(10%)', offset: 0.8}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateY(40%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(10%)', offset: 0.8}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ])
    ])
  ]
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
      }
    );
  }

  openDialog(training: Training): void {
    this.userService.training = training;
    this.userService.getPendingList().subscribe(result => {}, error => {});
    this.userService.closeDialog.subscribe(result => {
      this.getEnrollmentsList();
      this.dialog.closeAll();
    });
    const dialogRef = this.dialog.open(SpocFormComponent, {
    });
  }

  onScrollDown(all: Training[], original: Training[]) {
    this.spinnerService.show();
    if (all.length < original.length - 4) {
      const len = all.length;

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
