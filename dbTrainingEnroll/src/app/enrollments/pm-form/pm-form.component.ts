import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user.service';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-pm-form',
  templateUrl: './pm-form.component.html',
  styleUrls: ['./pm-form.component.scss']
})
export class PmFormComponent implements OnInit {

  managerForm: FormGroup;
  valid: boolean;
  filteredUsers: Observable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.managerForm = new FormGroup({
      'users': new FormArray([])
    });
    this.onAddUser();
    // (<FormArray>this.managerForm.get(('users'))).get(0).
  }

  onAddUser() {
    const control = new FormControl(null, [Validators.required, Validators.email, this.checkEmployee.bind(this)]);
    this.filteredUsers = control.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.filterUsers(name) : this.userService.accounts.slice())
      );
    (<FormArray>this.managerForm.get('users')).push(control);
  }

  checkEmployee(control: FormControl): {[s: string]: boolean} {
    this.valid = false;
    this.userService.accounts.forEach(user => {
      if (user.email === control.value) {
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
    console.log(this.managerForm);
  }

}
