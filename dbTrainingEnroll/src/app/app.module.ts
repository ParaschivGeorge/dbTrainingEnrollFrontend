import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ManagerFormComponent } from './dashboard/manager-form/manager-form.component';
import { UserService } from './user.service';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { PmFormComponent } from './enrollments/pm-form/pm-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { MatRadioModule } from '@angular/material/radio';
import { RecommendationService } from './recommendation.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportsService } from './reports.service';
import 'hammerjs';
import {AdminComponent} from "./admin/admin.component";

const appRoutes: Routes = [
  { path: 'enrollments', component: EnrollmentsComponent,
    canActivate: [AuthGuard],
    data: { title: 'DB Enrollments' } },
  { path: 'trainings',
    data: { title: 'DB Trainings'},
    component: DashboardComponent },
  { path: '', redirectTo: '/trainings', data: { title: 'DB Home' }, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'DB Login' } },
  { path: 'reports', component: ReportsComponent, data: { title: 'DB Reports' } },
  { path: 'admin', component: AdminComponent, data: { title: 'DB Admin' } }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    EnrollmentsComponent,
    ManagerFormComponent,
    PmFormComponent,
    LoginComponent,
    ReportsComponent,
    AdminComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    // HttpModule, (Deprecated)
    NgxPaginationModule,
    Ng4LoadingSpinnerModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [DashboardComponent, ManagerFormComponent, PmFormComponent, LoginComponent],
  providers: [UserService, AuthService, RecommendationService, AuthGuard, ReportsService,
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
     {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
