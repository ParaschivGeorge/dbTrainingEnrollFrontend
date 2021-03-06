import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Training} from '../../models/training';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {ManagerFormComponent} from '../../dashboard/manager-form/manager-form.component';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import {FormGroup} from '@angular/forms';
import * as Lodash from 'lodash';


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

  trainings: Training[];
  errors: string[];

  constructor(private spinnerService: Ng4LoadingSpinnerService,
              public apiService: ApiService,
              private userService: UserService,
              public dialog: MatDialog) { }

  getTrainings(): void {
    this.spinnerService.show();
    this.apiService.getAdminTrainings()
      .subscribe(
        result => {
          this.apiService.trainings = result;
          this.apiService.trainingsCopy = Lodash.cloneDeep(result);
          this.spinnerService.hide();
          
          this.errors = [];

          result.forEach(element => {
            this.errors.push('');
          });
        }
      );
  }

  onSubmit(training: Training, i: number) {
    this.userService.updateTrainingsList = [];
    this.userService.updateTrainingsList.push(training);

    this.userService.updateTrainings().subscribe(result => {
        this.getTrainings();
        this.errors[i] = '';
      },
      error => {
        this.errors[i] = error.error.message;
      });
  }

  onDelete(training: Training) {
    this.userService.training = training;
    this.userService.deleteTrainingsIdList = [];

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
    });
  }

  revert(i: number, prop: string) {
    if (prop === 'trainingResponsible') {
      this.apiService.trainings[i][prop].mail = this.apiService.trainingsCopy[i][prop].mail;
    } else {
      this.apiService.trainings[i][prop] = this.apiService.trainingsCopy[i][prop];
    }
  }

  save(i: number, prop: string) {
    if (prop === 'trainingResponsible') {
      this.apiService.trainingsCopy[i][prop].mail = this.apiService.trainings[i][prop].mail;
    } else {
      this.apiService.trainingsCopy[i][prop] = this.apiService.trainings[i][prop];
    }
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
        });
      } else {
        this.dialog.closeAll();
      }
    });
  }

}
