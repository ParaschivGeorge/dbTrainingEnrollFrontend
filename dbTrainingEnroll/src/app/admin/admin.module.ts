import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MaterialModule} from '../material.module';
import {MatExpansionModule, MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTabsModule,
    MatExpansionModule
  ],
  exports: [],
  declarations: [],
  entryComponents: []
})
export class AdminModule { }
