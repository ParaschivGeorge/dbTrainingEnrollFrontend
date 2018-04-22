import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginError = false;

  constructor(private authService: AuthService,
  private router: Router,
  private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  
  }

  onLogin(form: NgForm) {
    this.spinnerService.show();
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe(
      (data: any) => {
        console.log('succes');
        localStorage.setItem('userToken', data.token);
        console.log(data.token);
        this.router.navigate(['/enrollments']);
        form.resetForm();
        this.spinnerService.hide();
      },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        this.spinnerService.hide();
        console.log('error');
      }), console.error();

      console.log(this.isLoginError);
  }
}
