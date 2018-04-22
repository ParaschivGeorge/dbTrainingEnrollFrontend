import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginError = false;

  constructor(private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe(
      (data: any) => {
        console.log('succes');
        localStorage.setItem('userToken', data.token);
        console.log(data.token);
        this.router.navigate(['/enrollments']);
      },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        console.log('error');
      }), console.error();

      console.log(this.isLoginError);
  }
}
