import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Training } from '../models/training';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatPaginator, MatSnackBar } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { UserService } from '../services/user.service';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
import { RecommendationService } from '../services/recommendation.service';
import { Subscription } from 'rxjs/Subscription';
import { FilterPipe } from '../pipes/filter.pipe';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
  ],
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

  allRecommendedTrainings: Training[] = [];
  softRecommendedTrainings: Training[] = [];
  allRecommendedSoftTrainings: Training[] = [];
  techRecommendedTrainings: Training[] = [];
  allRecommendedTechTrainings: Training[] = [];
  originalRecommendedTrainings: Training[] = [];
  showRecommendations: boolean;

  private subscription: Subscription;

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    private userService: UserService,
    private recommendationService: RecommendationService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar) { }

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
    this.apiService.getTrainings()
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

  ngOnInit(): void {
    this.showRecommendations = false;
    this.subscription = this.recommendationService.getTrainings().subscribe(
      trainings => {
        this.originalRecommendedTrainings = trainings;
        this.allRecommendedTrainings = this.originalRecommendedTrainings;
        this.allRecommendedSoftTrainings = this.originalRecommendedTrainings.filter(data => data.categoryType === 'SOFT');
        this.softRecommendedTrainings = this.allRecommendedSoftTrainings;
        this.allRecommendedTechTrainings = this.originalRecommendedTrainings.filter(data => data.categoryType === 'TECHNICAL');
        this.techRecommendedTrainings = this.allRecommendedTechTrainings;
        this.spinnerService.hide();
        this.showRecommendations = true;
      }
    );
    this.getTrainings();
  }

  selfEnroll(training: Training) {
    this.userService.training = training;
    this.userService.postUserSelfEnroll().subscribe(
      result => {
        this.snackBar.open('You enrolled!', 'Ok', {duration: 1800});
      },
      error => {
        this.snackBar.open('You are already on the list or there was a server error!', 'Ok', {duration: 1800});
      }
    );
  }
}
