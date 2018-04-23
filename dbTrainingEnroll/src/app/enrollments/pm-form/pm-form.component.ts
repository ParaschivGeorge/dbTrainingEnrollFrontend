import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user.service';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PmFormResponse } from './pm-from-response';

@Component({
  selector: 'app-pm-form',
  templateUrl: './pm-form.component.html',
  styleUrls: ['./pm-form.component.scss']
})
export class PmFormComponent implements OnInit {

  pmForm: FormGroup;
  valid: boolean;
  filteredUsers: Observable<any[]>;
  mail: string;
  modelList: PmFormResponse[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.pmForm = new FormGroup({
      'users': new FormArray([])
    });
    this.userService.getPendingList().subscribe(
      users => {
        this.userService.accounts = users;
        console.log( this.userService.accounts);
      },
      error => console.log(error)
    );
  }

  acceptUser(mail: string) {
    const existingUser = this.modelList.find(el => el.mailUser === mail);
    console.log(existingUser);

    if (existingUser) {
      existingUser.status = 1;
    } else {
      const data: PmFormResponse = new PmFormResponse;
      data.mailUser = mail;
      data.idTraining = this.userService.training.id;
      data.status = 1;

      this.modelList.push(data);
    }

    console.log(this.modelList);
  }

  denyUser(mail: string) {
    const existingUser = this.modelList.find(el => el.mailUser === mail);

    if (existingUser) {
      existingUser.status = 0;
    } else {
      const data: PmFormResponse = new PmFormResponse;
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
  }

}
