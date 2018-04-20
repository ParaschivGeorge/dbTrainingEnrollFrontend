import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Training } from '../training';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiService]
})
export class DashboardComponent implements OnInit {
  trainings: Training[];
  enrollmentsTrainings: Training[];
  name: string;
  originalTrainings: Training[];

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    private spinnerService: Ng4LoadingSpinnerService,
    private userService: UserService) {}

  openDialog(training: Training): void {
    this.userService.training = training;
    this.userService.getEnrollmentsList().subscribe(result => {}, error=> {});
    this.userService.closeDialog.subscribe(result => this.dialog.closeAll());
    const dialogRef = this.dialog.open(ManagerFormComponent, {
    });

  }

  getTrainings(): void {
    this.spinnerService.show(),
    this.apiService.getTrainings()
    .subscribe(
      result => {
        this.originalTrainings = result,
        this.trainings = this.originalTrainings.slice(0, 8);
        console.log(this.trainings);
      } ,
      error => console.log('Error: ' + error)
    );
    this.spinnerService.hide();
  }

  onScrollDown() {
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
  }

  ngOnInit(): void {
    this.getTrainings(); 
  }
}
