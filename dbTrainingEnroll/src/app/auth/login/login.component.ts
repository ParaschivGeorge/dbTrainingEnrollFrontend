import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { RecommendationService } from '../../services/recommendation.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginError = false;

  constructor(private authService: AuthService,
  private router: Router,
  private spinnerService: Ng4LoadingSpinnerService,
  private userService: UserService,
  private recommendationService: RecommendationService,
  public loginSnackBar: MatSnackBar) { }

  ngOnInit() {

  }

  onLogin(form: NgForm) {
    this.spinnerService.show();
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password).subscribe(
      (data: any) => {
        this.userService.currentUser = new User;
        this.userService.currentUser.email = username;
        this.userService.currentUser.token = data.token;
        this.userService.postUserData().subscribe(
          result => {
            this.userService.currentUser.name = result.name;
            this.userService.currentUser.type = result.userType;
            this.userService.currentUser.lastLoginDate = result.lastLoginDate;

            if (this.userService.currentUser.type === 'USER') {
              this.userService.getNewNotifications().subscribe(
                newNotications => {
                  this.userService.newNoticationsList = newNotications;
                  if (this.userService.newNoticationsList) {
                    console.log(this.userService.newNoticationsList);
                  } else {
                    console.log('no notifications');
                  }
                  this.userService.loggedIn.emit(true);
                },
                error => {
                  console.log(error);
                }
              );
            }

            if (this.userService.currentUser.type === 'USER') {
              this.loginSnackBar.open('You are logged in!', 'Ok', {duration: 2000});
            } else if (this.userService.currentUser.type === 'MANAGER') {
              this.loginSnackBar.open('You are logged in as Manager!', 'Ok', {duration: 2000});
            } else if (this.userService.currentUser.type === 'SPOC') {
              this.loginSnackBar.open('You are logged in as SPOC!', 'Ok', {duration: 2000});
            }
            if (this.userService.currentUser.type === 'USER') {
              this.recommendationService.getRecommendedTrainings().subscribe(
                recommended => {
                  this.recommendationService.trainings = recommended;
                  this.recommendationService.sendTrainings();
               }
              );
            }
          });
        this.userService.closeDialog.emit(true);
        this.router.navigate(['/enrollments']);
        form.resetForm();
        this.spinnerService.hide();
      },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        this.spinnerService.hide();
        this.loginSnackBar.open('Logging failed!', 'Ok', {duration: 3000});
      });
  }
}
