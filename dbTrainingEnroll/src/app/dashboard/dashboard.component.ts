import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Training } from '../training';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})

export class DashboardComponent implements OnInit {
  trainings: Training[];
  name: string;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(Modal, {
      width: '250px',
      data: { name: "weirdo"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class Modal {

  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
