import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {AddTrainingsComponent} from "./add-trainings/add-trainings.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(){
    const dialogRef = this.dialog.open(AddTrainingsComponent, {
    });
  }

  ngOnInit() {
  }

}
