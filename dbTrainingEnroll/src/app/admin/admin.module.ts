import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MaterialModule} from "../material.module";
import {MatTabsModule} from "@angular/material";
import { AddTrainingsComponent } from './add-trainings/add-trainings.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTabsModule,MatExpansionModule
  ],
  exports: [AddTrainingsComponent],
  declarations: [AdminComponent, AddTrainingsComponent]
})
export class AdminModule { }
