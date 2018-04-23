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
import { RecommendationService } from '../recommendation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiService, RecommendationService],
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

  allRecommendedTrainings: Training[];
  softRecommendedTrainings: Training[];
  allRecommendedSoftTrainings: Training[];
  techRecommendedTrainings: Training[];
  allRecommendedTechTrainings: Training[];
  originalRecommendedTrainings: Training[];

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    private userService: UserService,
    private recommendationService: RecommendationService,
    private spinnerService: Ng4LoadingSpinnerService) {}

  openDialog(training: Training): void {
    if (this.userService.currentUser.type !== 'MANAGER') {
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

    this.recommendationService.getRecommendedTrainings()
    .subscribe(
      result => {
        this.originalRecommendedTrainings = result,
        this.allRecommendedTrainings = this.originalRecommendedTrainings,
        this.allRecommendedSoftTrainings = this.originalRecommendedTrainings.filter(data => data.categoryType === 'SOFT'),
        this.softRecommendedTrainings = this.allRecommendedSoftTrainings,
        this.allRecommendedTechTrainings = this.originalRecommendedTrainings.filter(data => data.categoryType === 'TECHNICAL'),
        this.techRecommendedTrainings = this.allRecommendedTechTrainings;
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
