import { Component, OnInit, ViewChild, trigger } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Training } from '../training';
import { ApiService } from '../api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EnrollmentsComponent } from '../enrollments/enrollments.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [EnrollmentsComponent, DashboardComponent]
})

export class MenuComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private enrollmentsComponent: EnrollmentsComponent,
    private dashboardComponent: DashboardComponent,
    public router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });
  }

}
