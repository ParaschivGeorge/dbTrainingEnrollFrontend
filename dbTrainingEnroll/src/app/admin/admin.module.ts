import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MaterialModule} from '../material.module';
import {MatTabsModule} from '@angular/material';
import { AddTrainingsComponent } from './add-trainings/add-trainings.component';
import { ShowTrainingsComponent } from './show-trainings/show-trainings.component';
import { AddTrainingFormComponent } from './add-training-form/add-training-form.component';
import { EditTrainingFormComponent } from './edit-training-form/edit-training-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTabsModule
  ],
  exports: [AddTrainingsComponent, EditTrainingFormComponent],
  declarations: [AdminComponent, AddTrainingsComponent, AddTrainingFormComponent, EditTrainingFormComponent],
  entryComponents: [AddTrainingsComponent]
})
export class AdminModule { }
