import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { forEach } from '@angular/router/src/utils/collection';
import { ManagerFormResponse } from './manager-form-response';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html',
  styleUrls: ['./manager-form.component.scss'],
})
export class ManagerFormComponent implements OnInit, OnDestroy {
  _MAX_NUMBER = 15;
  formLength = 0;
  managerForm: FormGroup;
  valid: boolean;
  filteredUsers: Observable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // remove comment when number of participants can be fetched
    // this._MAX_NUMBER = 15 - this.userService.training.numberOfParticipants;
    this.managerForm = new FormGroup({
      'users': new FormArray([])
    });

    this.managerForm.setValidators(this.checkMaxNumber.bind(this));
    this.onAddUser();
    this.userService.getEnrollmentsList().subscribe(
      users => {
        this.userService.accounts = users;
        console.log( this.userService.accounts);
      },
      error => console.log('Error: ' + error)
    );    
  }

  onAddUser() {
    if (this.formLength === this._MAX_NUMBER) {
      return;
    }
    const control = new FormControl(null, [Validators.required, Validators.email, this.checkEmployee.bind(this)]);
    this.filteredUsers = control.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.filterUsers(name) : this.userService.accounts.slice())
      );
    (<FormArray>this.managerForm.get('users')).push(control);
    this.formLength++;
  }

  onRemoveUser(i: number) {
    (<FormArray>this.managerForm.get('users')).controls.splice(i, 1);
    this.formLength--;
    (<FormArray>this.managerForm.get('users')).controls.forEach(element => {
      element.updateValueAndValidity();
    });
    this.managerForm.updateValueAndValidity();
  }

  checkEmployee(control: FormControl): {[s: string]: boolean} {
    this.valid = false;
    this.userService.accounts.forEach(user => {
      if (user.mail === control.value) {
        this.valid = true;
      }
    });

    if (!this.valid) {
      return {'notValidEmployee': true};
    }

    (<FormControl[]>(<FormArray>this.managerForm.get('users')).controls).forEach(formControl => {      
      if ((control != formControl) && (formControl.value === control.value))
        this.valid = false;
    });
    
    if (this.valid) {
      return null;
    }
    return {'notValidEmployee': true};
  }

  checkMaxNumber(control: FormControl): {[s: string]: boolean} {
    if (this.formLength > this._MAX_NUMBER)
      return {'limitExceeded': true};
    return null;
  }

  filterUsers(name: string) {
    return this.userService.accounts.filter(user =>
      user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onSubmit() {    
    let data: ManagerFormResponse = new ManagerFormResponse;

    data.trainingId = this.userService.training.id;
    data.emails = [];

    let formArray = (<FormArray>this.managerForm.get('users')).controls;
    formArray.forEach(control => {
      data.emails.push(control.value);
    })
    this.userService.data = data;
    console.log(data);
    this.userService.postEnrollmentsList().subscribe(result => {
      this.userService.closeDialog.emit();
    });
  }

  ngOnDestroy(): void {
    this.userService.accounts = [];
  }

  setStyleAdd(i: number) {
    let styles = {
      'visibility':  (i == this.formLength-1) && (this.formLength < this._MAX_NUMBER) ? 'visible' : ' hidden'
    };    
    return  styles;
  }

  setStyleRemove(i: number) {
    let styles = {
      'visibility':  this.formLength > 1 ? 'visible' : ' hidden'
    };    
    return  styles;
  }
}
