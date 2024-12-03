import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GetRoleNamePipe } from '../../shared/pipes/role-name.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, CommonModule, GetRoleNamePipe],
  template: `
    <pre>Goal: Get role name by async pipe</pre>

    <ng-container *ngIf="users$ | async as users; else pendingList">
      <li class="list-group-item" *ngFor="let user of users; let i = index">
        {{ user.name }}
        <span *ngIf="user.roleId | roleNamePipe: i | async as role; else pendingRole">
          (<em>{{ role }}</em
        >)
        </span>

        <ng-template #pendingRole>
          <i class="fa fa-spinner fa-spin fa-fw"></i>
        </ng-template>
      </li>
    </ng-container>

    <ng-template #pendingList>
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </ng-template>
  `
})
export class DemoAsyncPipeComponent {
  users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<User[]>('http://localhost:3000/users');
  }
}
