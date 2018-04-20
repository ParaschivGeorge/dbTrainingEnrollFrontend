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
  length = 0;
  managerForm: FormGroup;
  valid: boolean;
  filteredUsers: Observable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.managerForm = new FormGroup({
      'users': new FormArray([])
    });
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
    const control = new FormControl(null, [Validators.required, Validators.email, this.checkEmployee.bind(this)]);
    this.filteredUsers = control.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.filterUsers(name) : this.userService.accounts.slice())
      );
    (<FormArray>this.managerForm.get('users')).push(control);
    this.length++;  
  }

  onRemoveUser(i: number) {
    (<FormArray>this.managerForm.get('users')).controls.splice(i, 1);
    this.length--;    
  }

  checkEmployee(control: FormControl): {[s: string]: boolean} {
    this.valid = false;
    this.userService.accounts.forEach(user => {
      if (user.mail === control.value) {
        this.valid = true;
      }
    });
    if (this.valid) {
      return null;
    }
    return {'notValidEmployee': true};
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
      'visibility':  i == this.length-1 ? 'visible' : ' hidden'
    };    
    return  styles;
  }

  setStyleRemove(i: number) {
    let styles = {
      // CSS property names
      'visibility':  this.length > 1 ? 'visible' : ' hidden'
    };    
    return  styles;
  }
}
