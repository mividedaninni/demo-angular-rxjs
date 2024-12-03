import { Component } from '@angular/core';
import { NavbarComponent } from './core/components/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <div class="text-center mt-3">
      <app-navbar></app-navbar>
    </div>
    <hr />
    <div class="container-sm mt-3 text-center page">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
