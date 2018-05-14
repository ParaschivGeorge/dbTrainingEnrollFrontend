import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MaterialModule} from '../material.module';
import {MatExpansionModule, MatTabsModule} from '@angular/material';
import { AddTrainingsComponent } from './add-trainings/add-trainings.component';
import {EditTrainingFormComponent} from "./edit-training-form/edit-training-form.component";
import {AddTrainingFormComponent} from "./add-training-form/add-training-form.component";
import {ShowTrainingsComponent} from "./show-trainings/show-trainings.component";
import {InlineEditorModule} from "@qontu/ngx-inline-editor";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTabsModule,
    MatExpansionModule,
    InlineEditorModule,
    NgbModule
  ],
  exports: [],
  declarations: [],
  entryComponents: []
})
export class AdminModule { }
