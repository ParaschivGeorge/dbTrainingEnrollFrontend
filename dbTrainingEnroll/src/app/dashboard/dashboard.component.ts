import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Training } from '../models/training';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  PageEvent,
  MatPaginator,
  MatSnackBar,
  _MatProgressSpinnerMixinBase
} from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { UserService } from '../services/user.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';
import { RecommendationService } from '../services/recommendation.service';
import { Subscription } from 'rxjs/Subscription';
import { FilterPipe } from '../pipes/filter.pipe';
import { resolve, reject } from 'q';
@HostListener('window:scroll', [])
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        animate(
          300,
          keyframes([
            style({ opacity: 0, transform: 'translateY(40%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(10%)', offset: 0.8 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
          ])
        )
      ]),
      transition('* => void', [
        animate(
          300,
          keyframes([
            style({ opacity: 0, transform: 'translateY(40%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(10%)', offset: 0.8 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
          ])
        )
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  term: any;
  name: string;
  cantScroll = false;
  numberOfTrainings = 8;
  page = 0;
  bool = false;

  allTrainings: Training[];
  allSoftTrainings: Training[];
  allTechTrainings: Training[];

  enrollmentsTrainings: Training[];
  originalTrainings: Training[];

  allRecommendedTrainings: Training[] = [];
  allRecommendedSoftTrainings: Training[] = [];
  allRecommendedTechTrainings: Training[] = [];
  softRecommendedTrainings: Training[] = [];
  techRecommendedTrainings: Training[] = [];
  originalRecommendedTrainings: Training[] = [];
  showRecommendations: boolean;

  private subscription: Subscription;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    public userService: UserService,
    private recommendationService: RecommendationService,
    private spinnerService: Ng4LoadingSpinnerService,
    public snackBar: MatSnackBar
  ) {}

  openDialog(training: Training): void {
    if ((this.userService.currentUser.type !== 'MANAGER') ||
      (training.acceptedUsers === training.nrMax)) {
      return;
    }
    this.userService.training = training;
    // this.userService.getEnrollmentsList().subscribe(result => {}, error => {});
    this.userService.closeDialog.subscribe(result => this.dialog.closeAll());
    const dialogRef = this.dialog.open(ManagerFormComponent, {});
  }

  getFirstTrainings(): void {
    this.spinnerService.show();
    this.apiService
      .getTrainingsByPage(this.page, this.numberOfTrainings)
      .subscribe(result => {
        (this.originalTrainings = result),
          (this.allTrainings = this.originalTrainings),
          (this.allSoftTrainings = this.originalTrainings.filter(
            data => data.categoryType === 'SOFT'
          )),
          (this.allTechTrainings = this.originalTrainings.filter(
            data => data.categoryType === 'TECHNICAL'
          )),
          this.page++,
          this.spinnerService.hide();
      });
  }

  onScrollDown() {
    if (!this.bool) {
      this.bool = true;
      if (this.bool) {
        this.bool = true;
        this.apiService
          .getTrainingsByPage(this.page, this.numberOfTrainings)
          .subscribe(tempResult => {
            let temporaryTrainings = tempResult;
            let i = 0;

            while (temporaryTrainings[i]) {
              this.allTrainings.push(temporaryTrainings[i]);
              i++;
            }

            if (temporaryTrainings[i - 1]) {
              i = 0;
              temporaryTrainings = [];
              this.page++;
              this.bool = false;
              this.allSoftTrainings = this.originalTrainings.filter(data => data.categoryType === 'SOFT');
              this.allTechTrainings = this.originalTrainings.filter(data => data.categoryType === 'TECHNICAL');
            }
          });
        this.bool = true;
      }
    }
    return false;
  }

  selfEnroll(training: Training) {
    this.userService.training = training;
    this.userService.postUserSelfEnroll().subscribe(
      result => {
        this.snackBar.open('You enrolled!', 'Ok', { duration: 1800 });
      },
      error => {
        this.snackBar.open(
          'You are already on the list or there was a server error!',
          'Ok',
          { duration: 1800 }
        );
      }
    );
  }

  ngOnInit(): void {
    console.log(this.cantScroll);
    this.getFirstTrainings();
    this.showRecommendations = false;
    this.subscription = this.recommendationService
      .getTrainings()
      .subscribe(trainings => {
        this.originalRecommendedTrainings = trainings;
        this.allRecommendedTrainings = this.originalRecommendedTrainings;
        this.allRecommendedSoftTrainings = this.originalRecommendedTrainings.filter(
          data => data.categoryType === 'SOFT'
        );
        this.softRecommendedTrainings = this.allRecommendedSoftTrainings;
        this.allRecommendedTechTrainings = this.originalRecommendedTrainings.filter(
          data => data.categoryType === 'TECHNICAL'
        );
        this.techRecommendedTrainings = this.allRecommendedTechTrainings;
        this.spinnerService.hide();
        this.showRecommendations = true;
      });
    console.log(this.cantScroll);
  }
}
