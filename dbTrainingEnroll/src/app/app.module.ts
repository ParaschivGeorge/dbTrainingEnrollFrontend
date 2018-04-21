import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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

const appRoutes: Routes = [
  { path: 'enrollments', component: EnrollmentsComponent },
  { path: 'trainings', component: DashboardComponent },
  { path: '', redirectTo: '/trainings', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    EnrollmentsComponent,
    ManagerFormComponent
    SecondaryMenuComponent,
    PmFormComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule,
    RouterModule.forRoot(appRoutes),
  ],
  entryComponents: [DashboardComponent, ManagerFormComponent, PmFormComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
