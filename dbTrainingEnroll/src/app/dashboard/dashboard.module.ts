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
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [AuthService],
  exports: [
    DashboardComponent, ManagerFormComponent
  ],
  declarations: [ManagerFormComponent, DashboardComponent]
})
export class DashboardModule { }
