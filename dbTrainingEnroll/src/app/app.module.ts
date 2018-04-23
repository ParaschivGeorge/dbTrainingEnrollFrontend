import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

import { ManagerFormComponent } from './dashboard/manager-form/manager-form.component';
import { UserService } from './user.service';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { PmFormComponent } from './enrollments/pm-form/pm-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import {MatRadioModule} from '@angular/material/radio';
import { RecommendationService } from './recommendation.service';

const appRoutes: Routes = [
  { path: 'enrollments', component: EnrollmentsComponent, canActivate: [AuthGuard] },
  { path: 'trainings', component: DashboardComponent },
  { path: '', redirectTo: '/trainings', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
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
    LoginComponent
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
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [DashboardComponent, ManagerFormComponent, PmFormComponent, LoginComponent],
  providers: [UserService, AuthService, RecommendationService, AuthGuard,
     {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
     {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
