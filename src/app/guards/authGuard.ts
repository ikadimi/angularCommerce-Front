import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = localStorage.getItem('loggedIn');
      if (Boolean(isLoggedIn) === false) {
        this.router.navigate(['/']);
        return false;
      }

      return true
    }

    return true
  }
}
