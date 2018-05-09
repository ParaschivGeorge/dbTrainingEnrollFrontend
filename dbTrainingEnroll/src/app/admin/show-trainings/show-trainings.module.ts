import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from "@angular/material";
import {MatExpansionModule} from "@angular/material/expansion";
import {MaterialModule} from "../../material.module";
import {AdminComponent} from "../admin.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule
  ],
  exports: [ShowTrainingsModule],
  declarations: [AdminComponent, ShowTrainingsModule]
})
export class ShowTrainingsModule { }