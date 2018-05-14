import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../services/auth.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    Ng4LoadingSpinnerModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class LoginModule { }
