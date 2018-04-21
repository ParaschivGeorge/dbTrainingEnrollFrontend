import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MatTabsModule } from '@angular/material';
import { PmFormComponent } from './pm-form/pm-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { EnrollmentsComponent } from '../enrollments/enrollments.component';

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
  providers: [],
  exports: [
    EnrollmentsComponent, PmFormComponent
  ],
  declarations: [PmFormComponent, EnrollmentsComponent]
})

export class EnrollmentsModule { }
