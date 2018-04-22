import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../auth.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AuthService
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule { }
