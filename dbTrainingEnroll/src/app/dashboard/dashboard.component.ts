import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Training } from '../training';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { UserService } from '../user.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiService],
  animations: [
    trigger('loadingAnimation', [
      state('loaded', style({
        opacity: 1,
      })),
      state('notLoaded', style({
        opacity: 0,
      })),
      transition('notLoaded => loaded', animate('2500ms ease'))
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  allTrainings: Training[];
  softTrainings: Training[];
  allSoftTrainings: Training[];
  techTrainings: Training[];
  allTechTrainings: Training[];
  enrollmentsTrainings: Training[];
  name: string;
  originalTrainings: Training[];
  state = 'notLoaded';

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    private userService: UserService,
    private spinnerService: Ng4LoadingSpinnerService) {}

  openDialog(training: Training): void {
    if ((this.userService.currentUser.type !== 'MANAGER') ||
      (training.acceptedUsers === 15)) {
      return;
    }
    this.userService.training = training;
    this.userService.getEnrollmentsList().subscribe(result => {}, error => {});
    this.userService.closeDialog.subscribe(result => this.dialog.closeAll());
    const dialogRef = this.dialog.open(ManagerFormComponent, {
    });
  }

  getTrainings(): void {
    this.spinnerService.show();
    this.state = 'notLoaded';
    this.apiService.getTrainings()
    .subscribe(
      result => {
        this.originalTrainings = result,
        this.allTrainings = this.originalTrainings.slice(0, 8),
        this.allSoftTrainings = this.originalTrainings.filter(data => data.categoryType === 'SOFT'),
        this.softTrainings = this.allSoftTrainings.slice(0, 8),
        this.allTechTrainings = this.originalTrainings.filter(data => data.categoryType === 'TECHNICAL'),
        this.techTrainings = this.allTechTrainings.slice(0, 8);
        this.state = 'loaded';
        this.spinnerService.hide();
      } ,
      error => console.log('Error: ' + error)
    );
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

  ngOnInit(): void {
    this.getTrainings();
  }
}
