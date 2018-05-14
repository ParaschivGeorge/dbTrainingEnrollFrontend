import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit } from '@angular/core';
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
import { UserService } from './services/user.service';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { SpocFormComponent } from './enrollments/spoc-form/spoc-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { UserGuard } from './guards/user.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { MatRadioModule } from '@angular/material/radio';
import { RecommendationService } from './services/recommendation.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportsService } from './services/reports.service';
import { AdminComponent } from './admin/admin.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UserTrainingsComponent } from './user-trainings/user-trainings.component';
import { AddTrainingsComponent } from './admin/add-trainings/add-trainings.component';
import { NgUploaderModule } from 'ngx-uploader';
import { ShowTrainingsComponent } from './admin/show-trainings/show-trainings.component';
import { AddTrainingFormComponent } from './admin/add-training-form/add-training-form.component';
import { EditTrainingFormComponent } from './admin/edit-training-form/edit-training-form.component';
import { NotificationComponent } from './menu/notification/notification.component';
import { ApiService } from './services/api.service';
import 'hammerjs';
import { SpocGuard } from './guards/spoc.guard';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


const appRoutes: Routes = [
  {
    path: 'enrollments',
    component: EnrollmentsComponent,
    canActivate: [SpocGuard],
    data: { title: 'DB Enrollments' }
  },
  {
    path: 'trainings',
    data: { title: 'DB Trainings' },
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/trainings',
    data: { title: 'DB Home' },
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent, data: { title: 'DB Login' } },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [UserGuard],
    data: { title: 'DB Reports' }
  },
  { path: 'admin', component: AdminComponent, data: { title: 'DB Admin' } },
  {
    path: 'myTrainings',
    component: UserTrainingsComponent,
    data: { title: 'DB My Trainings' },
    canActivate: [UserGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    EnrollmentsComponent,
    ManagerFormComponent,
    SpocFormComponent,
    LoginComponent,
    ReportsComponent,
    AdminComponent,
    FilterPipe,
    UserTrainingsComponent,
    AddTrainingsComponent,
    ShowTrainingsComponent,
    AddTrainingFormComponent,
    EditTrainingFormComponent,
    NotificationComponent
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
    NgUploaderModule,
    RouterModule.forRoot(appRoutes),
    InlineEditorModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    DashboardComponent,
    ManagerFormComponent,
    SpocFormComponent,
    LoginComponent,
    AddTrainingsComponent,
    AdminComponent,
    AddTrainingFormComponent,
    EditTrainingFormComponent,
    NotificationComponent
  ],
  providers: [
    UserService,
    AuthService,
    RecommendationService,
    SpocGuard,
    ReportsService,
    UserGuard,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
