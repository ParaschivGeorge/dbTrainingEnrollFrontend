import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MaterialModule} from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule
  ],
  exports: [],
  declarations: []
})
export class ShowTrainingsModule { }
