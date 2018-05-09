import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MaterialModule} from '../material.module';
import {MatTabsModule} from '@angular/material';
import { AddTrainingsComponent } from './add-trainings/add-trainings.component';
import { ShowTrainingsComponent } from './show-trainings/show-trainings.component';
import { AddTrainingFormComponent } from './add-training-form/add-training-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTabsModule
  ],
  exports: [AddTrainingsComponent],
  declarations: [AdminComponent, AddTrainingsComponent, AddTrainingFormComponent],
  entryComponents: [AddTrainingsComponent]
})
export class AdminModule { }
