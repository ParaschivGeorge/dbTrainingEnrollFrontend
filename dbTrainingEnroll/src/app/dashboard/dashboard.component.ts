import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Training } from '../training';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ManagerFormComponent } from './manager-form/manager-form.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})
export class DashboardComponent implements OnInit {
  trainings: Training[];
  enrollmentsTrainings: Training[];
  name: string;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(ManagerFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  getTrainings(): void {
    this.apiService.getTrainings()
    .subscribe(
      result => this.trainings = result,
      error => console.log('Error: ' + error));
  }

  ngOnInit(): void {
    this.getTrainings();
  }
}
