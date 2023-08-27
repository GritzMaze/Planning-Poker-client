import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


function authGuardFactory(authService: AuthService, router: Router): CanActivateFn {
  return (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    if (authService.isAuthenticated()) {
      return true;
    }

    router.navigate(['/login'], {
      queryParams: {
        redirectUrl: state.url
      }
    });

    return false;
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate = authGuardFactory(this.authService, this.router);
}
