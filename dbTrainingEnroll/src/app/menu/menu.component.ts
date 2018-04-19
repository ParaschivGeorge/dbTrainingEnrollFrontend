import { Component, OnInit, ViewChild, trigger } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Training } from '../training';
import { ApiService } from '../api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EnrollmentsComponent } from '../enrollments/enrollments.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [EnrollmentsComponent, DashboardComponent]
})

export class MenuComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private enrollmentsComponent: EnrollmentsComponent, private dashboardComponent: DashboardComponent) { }

  ngOnInit() {
  }

}
