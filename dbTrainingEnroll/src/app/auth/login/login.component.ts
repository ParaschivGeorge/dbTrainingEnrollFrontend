import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { RecommendationService } from '../../recommendation.service';

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
  private recommendationService: RecommendationService
) { }

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
            console.log(result);
            this.userService.currentUser.name = result.name;
            this.userService.currentUser.type = result.userType;
            this.userService.currentUser.lastLoginDate = result.lastLoginDate;
            console.log(this.userService.currentUser.type);

            if (this.userService.currentUser.type === 'USER') {
              this.recommendationService.getRecommendedTrainings().subscribe(
                recommended => {
                  this.recommendationService.trainings = recommended;
                  // console.log(recommended);
                  this.recommendationService.gotRecommendations.emit(true);
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
      });
  }
}
