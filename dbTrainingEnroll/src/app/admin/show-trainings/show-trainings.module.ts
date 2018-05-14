import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MaterialModule} from '../../material.module';
import {AdminComponent} from '../admin.component';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule,
    InlineEditorModule,
    NgbModule.forRoot()
  ],
  exports: [],
  declarations: []
})
export class ShowTrainingsModule { }
