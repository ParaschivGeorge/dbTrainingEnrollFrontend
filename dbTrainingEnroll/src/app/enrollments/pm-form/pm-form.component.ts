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

    this.acceptUser(this.mail);
    this.denyUser(this.mail);
    this.userService.getPendingList().subscribe(
      users => {
        this.userService.accounts = users;
        console.log( this.userService.accounts);
      },
      error => console.log('Error: ' + error)
    );
  }

  acceptUser(mail: string) {
    const data: PmFormResponse = new PmFormResponse;
    data.mailUser = mail;
    data.idTraining = this.userService.training.id;
    data.status = 1;

    this.modelList.push(data);

    console.log(this.modelList);
  }

  denyUser(mail: string) {
    const data: PmFormResponse = new PmFormResponse;
    data.mailUser = mail;
    data.idTraining = this.userService.training.id;
    data.status = 0;

    this.modelList.push(data);

  }

  onSubmit() {
    this.userService.modelList = this.modelList;
    this.userService.postPendingList().subscribe(result => { });
  }

}
