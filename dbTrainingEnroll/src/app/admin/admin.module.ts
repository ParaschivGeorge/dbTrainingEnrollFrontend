import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MaterialModule} from "../material.module";
import {MatTabsModule} from "@angular/material";
import { AddTrainingsComponent } from './add-trainings/add-trainings.component';
import { ShowTrainingsComponent } from './show-trainings/show-trainings.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTabsModule
  ],
  exports: [AddTrainingsComponent, ShowTrainingsComponent],
  declarations: [AdminComponent, AddTrainingsComponent, ShowTrainingsComponent]
})
export class AdminModule { }
