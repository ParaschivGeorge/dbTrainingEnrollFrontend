import {AddTrainingsComponent} from './add-trainings.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MaterialModule} from '../../material.module';
import {AdminComponent} from '../admin.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule
  ],
  exports: [],
  declarations: []
})
export class AddTrainingsModule { }
