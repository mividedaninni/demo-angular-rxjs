import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { IfRoleDirective } from '../auth/if-role.directive';
import { IfLoggedDirective } from '../auth/if-logged.directive';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLinkActive,
    RouterLink,
    CommonModule,
    IfRoleDirective,
    IfLoggedDirective
  ],
  styles: [
    `
      .active {
        background: orange;
      }
    `
  ],
  template: `
    <div class="btn-group">
      <button
        class="btn btn-outline-primary"
        routerLink="/users"
        routerLinkActive="active"
        *appIfRole="'admin'"
      >
        Demo Users (forkJoin)
      </button>

      <button
        class="btn btn-outline-primary"
        routerLink="/demo-async-pipe"
        routerLinkActive="active"
        *appIfRole="'admin'"
      >
        Demo Users (async pipe)
      </button>

      <button
        class="btn btn-outline-primary"
        routerLink="/meteo"
        routerLinkActive="active"
        *ngIf="authService.isLogged$ | async"
      >
        METEO
      </button>

      <button *appIfLogged class="btn btn-outline-primary" (click)="logout()">
        LOGOUT ({{ authService.displayName$ | async }})
      </button>
    </div>
  `
})
export class NavbarComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url)
      );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
