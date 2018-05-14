import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class SpocGuard implements CanActivate {
  constructor(private router: Router,
  private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.userService.currentUser.type === 'SPOC') {
        return true;
      }
      this.router.navigate(['/trainings']);
      return false;
  }
}