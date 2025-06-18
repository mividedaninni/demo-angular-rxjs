import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';
import { AdminGuard } from './core/auth/admin.guard';
import { MeteoComponent } from './features/meteo/meteo.component';
import { DemoAsyncPipeComponent } from './features/demo-async-pipe/demo-async-pipe.component';
import { UsersDetailsComponent } from './features/users-details/users-details.component';
import { LoginComponent } from './features/login/login.component';
import { DropdownComponent } from './features/dropdown/dropdown/dropdown.component';

export const routes: Routes = [
  { path: 'demo-async-pipe', component: DemoAsyncPipeComponent },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UsersDetailsComponent, canActivate: [AdminGuard] },
  { path: 'meteo', component: MeteoComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: '', component: LoginComponent }
];
