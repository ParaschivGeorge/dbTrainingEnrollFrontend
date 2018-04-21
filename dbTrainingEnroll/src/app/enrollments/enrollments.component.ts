import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Training } from '../training';
import { PmFormComponent } from './pm-form/pm-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['../dashboard/dashboard.component.scss'],
  providers: [ApiService]
})
export class EnrollmentsComponent implements OnInit {
  trainings: Training[];

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  getEnrollmentsList(): void {
    this.apiService.getEnrollmentsList()
    .subscribe(
      result => this.trainings = result,
      error => console.log('Error: ' + error));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PmFormComponent, {
    });
  }

  ngOnInit() {
    this.getEnrollmentsList();
  }

}
