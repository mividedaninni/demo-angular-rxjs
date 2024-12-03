import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../model/user';

@Component({
  selector: 'app-users-details',
  imports: [CommonModule, RouterLink],
  standalone: true,
  template: `
    <pre>Goal: get user info by router params & XHR</pre>

    <div *ngIf="userHTML as html; else spinner">
      <div [innerHTML]="html"></div>
      <button class="btn btn-primary mt-2" routerLink="/users">Back</button>
    </div>

    <ng-template #spinner>
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </ng-template>
  `
})
export class UsersDetailsComponent {
  userHTML: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.http.get<User>(`http://localhost:3000/users/${id}`)),
        map((user) => `<h1>${user.name}</h1> ${user.description}`)
      )
      .subscribe((html) => (this.userHTML = html));
  }
}
