import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MaterialModule} from '../../material.module';
import {AdminComponent} from '../admin.component';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule,
    InlineEditorModule,
    NgbModule.forRoot()
  ],
  exports: [ShowTrainingsModule],
  declarations: [AdminComponent, ShowTrainingsModule]
})
export class ShowTrainingsModule { }
