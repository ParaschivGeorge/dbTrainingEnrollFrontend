import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user.service';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { forEach } from '@angular/router/src/utils/collection';
import { ManagerFormResponse } from './manager-form-response';
import { UserDto } from '../../userDto';
import { MatSnackBar } from '@angular/material';
import { EnrollmentDetailsDto } from '../../enrollmentDetailsDto';

@Component({
  selector: 'app-manager-form',
  templateUrl: './manager-form.component.html',
  styleUrls: ['../../forms.scss'],
})

export class ManagerFormComponent implements OnInit, OnDestroy {
  _MAX_NUMBER = 15;
  formLength = 0;
  managerForm: FormGroup;
  valid: boolean;
  filteredUsers: Observable<any[]>;
  duration: string;
  self_enrolled_users: UserDto[];

  types = ['BUILD', 'GROW'];
  urgencies = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(private userService: UserService,
    private submitSnackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.userService.training.duration !== '-1') {
      this.duration = this.userService.training.duration;
    } else {
      this.duration = '';
    }

    this._MAX_NUMBER = 15 - this.userService.training.acceptedUsers;
    this.managerForm = new FormGroup({
      'users': new FormArray([])
    });

    this.managerForm.setValidators(this.checkMaxNumber.bind(this));
    this.onAddUser();
    this.userService.getEnrollmentsList().subscribe(
      users => {
        this.userService.accounts = users;
        this.userService.getSelfEnrolledList().subscribe(
          self_enrolled_users => {
            this.self_enrolled_users = self_enrolled_users;

            this.self_enrolled_users.forEach(self_enrolled_user => {
              const form_group = new FormGroup({
                'email': new FormControl(self_enrolled_user.mail, [Validators.required, Validators.email, this.checkEmployee.bind(this)]),
                'type': new FormControl('BUILD'),
                'urgency': new FormControl('MEDIUM'),
                'comment': new FormControl('')
              });

              form_group.updateValueAndValidity();

              this.userService.accounts.push(self_enrolled_user);
              (<FormArray>this.managerForm.get('users')).insert(0, form_group);
              this.formLength++;
              this.managerForm.updateValueAndValidity();
            });
          }
        );
      },
    );
  }

  onAddUser() {
    if (this.formLength === this._MAX_NUMBER) {
      return;
    }
    const form_group = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmployee.bind(this)]),
      'type': new FormControl('BUILD'),
      'urgency': new FormControl('MEDIUM'),
      'comment': new FormControl('')
    });

    this.filteredUsers = form_group.get('email').valueChanges.pipe(
      startWith(''),
      map(name => name ? this.filterUsers(name) : this.userService.accounts.slice())
    );

    (<FormArray>this.managerForm.get('users')).push(form_group);
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

    (<FormGroup[]>(<FormArray>this.managerForm.get('users')).controls).forEach(formGroup => {
      if ((control !== formGroup.get('email')) && (formGroup.get('email').value === control.value)) {
        this.valid = false;
      }
    });

    if (this.valid) {
      return null;
    }
    return {'notValidEmployee': true};
  }

  checkMaxNumber(control: FormControl): {[s: string]: boolean} {
    if (this.formLength > this._MAX_NUMBER) {
      return {'limitExceeded': true};
    }
    return null;
  }

  filterUsers(name: string) {
    return this.userService.accounts.filter(user =>
      user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onSubmit() {
    const data: ManagerFormResponse = new ManagerFormResponse;

    data.trainingId = this.userService.training.id;
    data.enrollmentDetailsDto = [];

    const formArray = (<FormArray>this.managerForm.get('users')).controls;

    formArray.forEach(controlGroup => {
      const enrollmentDetails = new EnrollmentDetailsDto;
      enrollmentDetails.userEmail = controlGroup.get('email').value;
      enrollmentDetails.trainingType = controlGroup.get('type').value;
      enrollmentDetails.urgencyType = controlGroup.get('urgency').value;
      enrollmentDetails.comment = controlGroup.get('comment').value;
      data.enrollmentDetailsDto.push(enrollmentDetails);
    });

    this.userService.data = data;
    this.userService.postEnrollmentsList().subscribe(result => {
      this.userService.closeDialog.emit();
    });
    this.submitSnackBar.open('Form submitted', 'Ok', { duration: 2000} );
  }

  ngOnDestroy(): void {
    this.userService.accounts = [];
  }

  setStyleAdd(i: number) {
    const styles = {
      'visibility':  (i === this.formLength - 1) && (this.formLength < this._MAX_NUMBER) ? 'visible' : ' hidden'
    };
    return  styles;
  }

  setStyleRemove(i: number) {
    const styles = {
      'visibility':  this.formLength > 1 ? 'visible' : ' hidden'
    };
    return  styles;
  }
}
