import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddTrainingsComponent} from './add-trainings/add-trainings.component';
import {AddTrainingFormComponent} from './add-training-form/add-training-form.component';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  arrayBuffer: any;
  fileToUpload: File;
  // file: File = null;
  file: File;
  adminAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private userService: UserService,
              private apiService: ApiService) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddTrainingsComponent, {
    });
    this.userService.closeDialog.subscribe(result => {
      this.apiService.getAdminTrainings()
      .subscribe(
        trainings => {
          this.apiService.trainings = trainings;
          this.dialog.closeAll();
        }
      );
    });
  }

  openTrainingForm() {
    const dialogRef = this.dialog.open(AddTrainingFormComponent, {
    });
    this.userService.closeDialog.subscribe(result => {
      this.apiService.getAdminTrainings()
        .subscribe(
          trainings => {
            this.apiService.trainings = trainings;
            this.dialog.closeAll();
          }
        );
    });
  }

  ngOnInit() {
    this.adminAddForm = new FormGroup({
      'excelInput': new FormControl(null)
    });
  }
}
