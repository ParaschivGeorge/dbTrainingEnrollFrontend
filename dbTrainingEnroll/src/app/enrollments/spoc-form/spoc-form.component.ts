import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { SpocFormResponse } from './spoc-form-response';
import { MatSnackBar } from '@angular/material';
import {UserDto} from '../../models/userDto';

@Component({
  selector: 'app-spoc-form',
  templateUrl: './spoc-form.component.html',
  styleUrls: ['../../../styles/forms.scss']
})
export class SpocFormComponent implements OnInit, OnDestroy {

  spocForm: FormGroup;
  valid: boolean;
  filteredUsers: Observable<any[]>;
  mail: string;
  modelList: SpocFormResponse[] = [];
  buttonIsClicked = false;

  constructor(public userService: UserService,
  private submitSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.spocForm = new FormGroup({
      'users': new FormArray([])
    });
    this.userService.getPendingList().subscribe(
      enrollments => {
        this.userService.enrollmentList = enrollments;
        this.userService.enrollmentList.forEach(enrollment => {
          const form_group = new FormGroup({
            'comment': new FormControl('', [this.checkComment.bind(this)])
          });
          (<FormArray>this.spocForm.get('users')).insert(0, form_group);
        });
      },
    );
  }

  checkComment(control: FormControl): {[s: string]: boolean} {
    let valid = true;
    let i = 0;
    let pos = 0;
    (<FormGroup[]>(<FormArray>this.spocForm.get('users')).controls).forEach(formGroup => {
      i++;
      if (formGroup.get('comment') === control) {
        pos = i;
      }
    });

    i = 0;
    this.modelList.forEach(spocFormResponse => {
      i++;
      if (i === pos && spocFormResponse.status === 0 && control.value === '') {
        valid = false;
      }
    });

    if (!valid) {
      return {'commentNotProvided': true};
    }
    return null;
  }

  acceptUser(mail: string, i: number) {
    const existingUser = this.modelList.find(el => el.mailUser === mail);

    if (existingUser) {
      existingUser.status = 1;
      existingUser.comment = (<FormArray>this.spocForm.get('users')).get('' + i).get('comment').value;
    } else {
      const data: SpocFormResponse = new SpocFormResponse;
      data.mailUser = mail;
      data.idTraining = this.userService.training.id;
      data.status = 1;
      data.comment = (<FormArray>this.spocForm.get('users')).get('' + i).get('comment').value;
      this.modelList.push(data);
    }
  }

  denyUser(mail: string, i) {
    const existingUser = this.modelList.find(el => el.mailUser === mail);

    if (existingUser) {
      existingUser.status = 0;
      existingUser.comment = (<FormArray>this.spocForm.get('users')).get('' + i).get('comment').value;
    } else {
      const data: SpocFormResponse = new SpocFormResponse;
      data.mailUser = mail;
      data.idTraining = this.userService.training.id;
      data.status = 0;
      data.comment = (<FormArray>this.spocForm.get('users')).get('' + i).get('comment').value;
      this.modelList.push(data);
    }
  }

  updateComment(mail: string, i: number) {
    const existingUser = this.modelList.find(el => el.mailUser === mail);

    if (existingUser) {
      existingUser.comment = (<FormArray>this.spocForm.get('users')).get('' + i).get('comment').value;
    }
  }

  onSubmit() {
    (<FormGroup[]>(<FormArray>this.spocForm.get('users')).controls).forEach(formGroup => {
      formGroup.get('comment').updateValueAndValidity();
    });
    this.spocForm.get('users').updateValueAndValidity();
    this.spocForm.updateValueAndValidity();
    
    if (this.spocForm.valid) {
      this.userService.modelList = this.modelList;
      this.userService.postPendingList().subscribe(result => {
        this.userService.closeDialog.emit();
       });
       this.submitSnackBar.open('List submitted!', 'Ok', {duration: 2000});
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.userService.modelList = [];
    this.userService.enrollmentList = [];
  }

}
