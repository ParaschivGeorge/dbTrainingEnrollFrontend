import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Modal } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { ManagerFormComponent } from './manager-form/manager-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    ManagerFormComponent,
    Modal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  entryComponents: [Modal, DashboardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
