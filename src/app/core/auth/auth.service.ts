import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, UserRoles } from './auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth$: BehaviorSubject<Auth | null> = new BehaviorSubject<Auth | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const auth = localStorage.getItem('auth');
    if (auth != null) {
      this.auth$.next(JSON.parse(auth));
    }
  }

  get isLogged$(): Observable<boolean> {
    return this.auth$.pipe(map((value) => !!value));
  }

  get role$(): Observable<UserRoles | undefined> {
    return this.auth$.pipe(map((auth) => auth?.role));
  }

  get token$(): Observable<string | undefined> {
    return this.auth$.pipe(map((auth) => auth?.token));
  }

  get displayName$(): Observable<string | undefined> {
    return this.auth$.pipe(map((auth) => auth?.displayName));
  }

  login(username: string, password: string): void {
    const params = new HttpParams().set('username', username).set('password', password);

    this.http.get<Auth>('http://localhost:3000/login', { params }).subscribe((res) => {
      this.auth$.next(res);
      localStorage.setItem('auth', JSON.stringify(res));
      this.router.navigateByUrl('users');
    });
  }

  logout(): void {
    this.auth$.next(null);
    localStorage.removeItem('auth');
    this.router.navigateByUrl('/');
  }
}
