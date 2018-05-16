import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Training} from '../../models/training';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {ManagerFormComponent} from '../../dashboard/manager-form/manager-form.component';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material';
import {EditTrainingFormComponent} from '../edit-training-form/edit-training-form.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-show-trainings',
  templateUrl: './show-trainings.component.html',
  styleUrls: ['./show-trainings.component.scss'],
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
export class ShowTrainingsComponent implements OnInit {

  constructor(private spinnerService: Ng4LoadingSpinnerService,
              private apiService: ApiService,
              private userService: UserService,
              public dialog: MatDialog) { }

  getTrainings(): void {
    this.spinnerService.show();
    this.apiService.getAdminTrainings()
      .subscribe(
        result => {
          this.apiService.trainings = result;
          this.spinnerService.hide();
        }
      );
  }

  saveEditable(value) {
    // call to http service
    console.log(value);
  }

  openEditDialog(training: Training) {
    this.userService.training = training;
    this.userService.closeDialog.subscribe(result => {
      this.getTrainings();
      this.dialog.closeAll();
    });
    const dialogRef = this.dialog.open(EditTrainingFormComponent, {
    });
  }

  onDelete(training: Training) {
    this.userService.training = training;
    this.userService.deleteTrainingsIdList = [];

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
    });
  }

  ngOnInit() {
    this.getTrainings();

    this.userService.closeDeleteDialog.subscribe(bool => {
      if (bool) {
        this.userService.deleteTrainingsIdList.push(this.userService.training.id);
        this.userService.deleteTrainings().subscribe(result => {
          this.getTrainings();
          this.dialog.closeAll();
        },
        error => {
          console.log(error);
        });
      } else {
        this.dialog.closeAll();
      }
    });
  }

}
