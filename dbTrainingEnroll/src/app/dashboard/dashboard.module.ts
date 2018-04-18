import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, ManagerForm } from './dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ManagerForm
  ],
  declarations: [DashboardComponent, ManagerForm],
  entryComponents: [ManagerForm]
})
export class DashboardModule { }
