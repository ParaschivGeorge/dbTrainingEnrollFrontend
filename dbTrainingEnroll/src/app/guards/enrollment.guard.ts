import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Injectable()
export class EnrollmentGuard implements CanActivate {
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
