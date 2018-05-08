import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user.service';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { SpocFormResponse } from './spoc-form-response';
import { MatSnackBar } from '@angular/material';
import {UserDto} from '../../userDto';

@Component({
  selector: 'app-spoc-form',
  templateUrl: './spoc-form.component.html',
  styleUrls: ['../../forms.scss']
})
export class SpocFormComponent implements OnInit {

  spocForm: FormGroup;
  valid: boolean;
  filteredUsers: Observable<any[]>;
  mail: string;
  modelList: SpocFormResponse[] = [];
  buttonIsClicked = false;

  constructor(private userService: UserService,
  private submitSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.spocForm = new FormGroup({
      'users': new FormArray([])
    });
    this.userService.getPendingList().subscribe(
      users => {
        this.userService.accounts = users;
        this.userService.accounts.forEach(user => {
          const form_group = new FormGroup({
            'comment': new FormControl('')
          });
          (<FormArray>this.spocForm.get('users')).insert(0, form_group);
        });
      },
    );
  }

  acceptUser(mail: string) {
    const existingUser = this.modelList.find(el => el.mailUser === mail);

    if (existingUser) {
      existingUser.status = 1;
    } else {
      const data: SpocFormResponse = new SpocFormResponse;
      data.mailUser = mail;
      data.idTraining = this.userService.training.id;
      data.status = 1;
      this.modelList.push(data);
    }

  }

  denyUser(mail: string) {
    const existingUser = this.modelList.find(el => el.mailUser === mail);

    if (existingUser) {
      existingUser.status = 0;
    } else {
      const data: SpocFormResponse = new SpocFormResponse;
      data.mailUser = mail;
      data.idTraining = this.userService.training.id;
      data.status = 0;

      this.modelList.push(data);
    }

  }

  onSubmit() {
    this.userService.modelList = this.modelList;
    this.userService.postPendingList().subscribe(result => {
      this.userService.closeDialog.emit();
     });
     this.submitSnackBar.open('List submitted!', 'Ok', {duration: 2000});
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.userService.accounts = [];
  }

}
