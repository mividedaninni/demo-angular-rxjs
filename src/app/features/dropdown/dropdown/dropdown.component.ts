import { Component } from '@angular/core';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    DropdownMenuComponent,
    NgIf
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  public isMenuVisible: boolean;

  constructor() {
    this.isMenuVisible = false;
  }

  toggleVisibility() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  test(e: any) {
    console.log(e);
  }
}
