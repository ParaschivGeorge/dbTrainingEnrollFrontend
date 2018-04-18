import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, Modal } from './dashboard.component';
import { ManagerFormComponent } from '../manager-form/manager-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ManagerFormComponent
  ],
  declarations: [DashboardComponent, Modal],
  entryComponents: [Modal]
})
export class DashboardModule { }
