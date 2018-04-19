import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { ManagerFormComponent } from './manager-form/manager-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ManagerFormComponent]
})
export class DashboardModule { }
