import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../../model/role';
import { User } from '../../model/user';

export interface Member {
  id: number;
  name: string;
  roleName: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <pre>Goal: Multiple XHR with mapping</pre>

    <li
      class="list-group-item list-group-item-action"
      *ngFor="let member of members"
      [routerLink]="'/users/' + member.id"
    >
      {{ member.name }} - {{ member.roleName }}
    </li>
    <div class="mt-3" *ngIf="members; else spinner">Click user to see details</div>
    <ng-template #spinner>
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </ng-template>
  `
})
export class UsersComponent {
  members: Member[] | null = null;

  constructor(private http: HttpClient) {
    forkJoin({
      users: this.http.get<User[]>('http://localhost:3000/users'),
      roles: this.http.get<Role[]>('http://localhost:3000/roles')
    })
      .pipe(
        map((result) =>
          result.users.map((u) => ({
            id: u.id,
            name: u.name,
            roleName: result.roles.find((r) => r.id === u.roleId)!.roleName
          }))
        )
      )
      .subscribe((result) => (this.members = result));
  }
}
