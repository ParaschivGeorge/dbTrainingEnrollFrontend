import { Component, OnInit, ViewChild, trigger } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Training } from '../training';
import { ApiService } from '../api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EnrollmentsComponent } from '../enrollments/enrollments.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [EnrollmentsComponent, DashboardComponent]
})

export class MenuComponent implements OnInit {
  userClaims: 'none';

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private enrollmentsComponent: EnrollmentsComponent,
    private dashboardComponent: DashboardComponent,
    public router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
  }

  openLogin(): void {
    this.userService.closeDialog.subscribe(result =>
    this.dialog.closeAll());
    const dialogRef = this.dialog.open(LoginComponent, {
    });
  }

  logout(): void {
    this.userService.currentUser.token = null;
    this.userService.currentUser.email = null;
    this.userService.currentUser.type = null;
    this.userService.currentUser.name = null;
    this.userService.currentUser.gender = null;
    this.userService.currentUser.lastLoginDate = null;
    this.router.navigate(['/trainings']);
    }
}
