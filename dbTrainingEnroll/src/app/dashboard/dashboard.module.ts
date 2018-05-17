import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MatTabsModule } from '@angular/material';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../services/auth.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthService],
  exports: [
  ],
  declarations: []
})
export class DashboardModule { }
