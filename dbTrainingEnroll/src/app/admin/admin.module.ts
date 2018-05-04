import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MaterialModule} from "../material.module";
import {MatTabsModule} from "@angular/material";
import { AddTrainingsComponent } from './add-trainings/add-trainings.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTabsModule
  ],
  declarations: [AdminComponent, AddTrainingsComponent]
})
export class AdminModule { }
