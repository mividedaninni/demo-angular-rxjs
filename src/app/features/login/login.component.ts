import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserValidatorsService } from '../../shared/forms/user-validator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <pre> Goal: Async validator with Reactive Forms</pre>

    <form [formGroup]="form" class="card" (submit)="login()">
      <div class="card-header">
        {{ username?.errors?.['userNotExists'] ? 'User does not exist' : 'Sign In' }}
      </div>
      <div class="card-body">
        <div class="input-group mb-2">
          <div class="input-group-text">
            <i *ngIf="username?.pending" class="fa fa-spinner fa-spin fa-fw"></i>
            <i
              class="fa"
              [ngClass]="{
                'fa-check': username?.valid,
                'fa-exclamation-circle': username?.invalid,
              }"
            ></i>
          </div>
          <input
            type="text"
            formControlName="username"
            class="form-control"
            [ngClass]="{ 'is-invalid': username?.invalid && form.dirty }"
            placeholder="username"
          />
        </div>
        <div class="input-group mb-2">
          <input
            type="password"
            formControlName="password"
            class="form-control"
            placeholder="password"
          />
        </div>
        <button [disabled]="form.invalid || form.pending" class="btn btn-primary btn-block">
          Sign In
        </button>
      </div>
    </form>
  `
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private userValidators: UserValidatorsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['Davide', Validators.required, this.userValidators.uniqueName()],
      password: ['a12345a6', Validators.required]
    });
  }

  get username(): AbstractControl | null {
    return this.form.get('username');
  }

  login(): void {
    const { username, password } = this.form.value;
    this.authService.login(username, password);
  }
}
