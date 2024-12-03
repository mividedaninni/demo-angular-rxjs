import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ADMIN } from './auth';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.role$.pipe(
      map((role) => role === ADMIN),
      tap((allowAccess) => {
        if (!allowAccess) {
          console.log('access deny');
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
