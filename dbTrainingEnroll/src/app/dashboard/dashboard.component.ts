import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Training } from '../training';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})

export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  originalTrainings: Training[];
  trainings: Training[];

  constructor(private apiService: ApiService,
     public dialog: MatDialog,
     private spinnerService: Ng4LoadingSpinnerService) {}

  openDialog(): void { }

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
    console.log(this.trainings + ' ' + this.originalTrainings);
    if (this.trainings.length < this.originalTrainings.length) {
      const len = this.trainings.length;

      for (let i = len; i <= len + 4; i ++) {
        this.trainings.push(this.originalTrainings[i]);
    }
  }
  }

  ngOnInit(): void {
    this.getTrainings();
  }
}
