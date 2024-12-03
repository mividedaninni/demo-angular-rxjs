# Demo Angular + RxJs - Fincons Academy 2024

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

It can be considered an update of this repo owned by Fabio
Biondi: https://github.com/fabiobiondi/talk-angular-rxjs-real-usecases

## Development server

To start the project run:

```bash
npm run start
```

Otherwise, you could run separately:

```bash
npm run server

ng serve
```

## Examples

Following a list of examples you can find in the repository:

### AUTHENTICATION EXAMPLE

| File                         | Goal                                                                                                                              | RxJS topic                                                                                                          |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `login.component`            | **ROUTED COMPONENT:** <br> Example of Reactive forms with async validator                                                         |                                                                                                                     |
| `user.validators.service.ts` | **ASYNC VALIDATOR SERVICE:** <br> Check if username exists, handle pending and return error if not (used in `login.component.ts`) | `timer` <br> `switchmap`                                                                                            |
| `auth.service.ts`            | **SERVICE:** <br>Simulate JWT (login / logout / role / token) by using RxJS Subject to store and share data                       | `BehaviorSubject` <br> `map`                                                                                        |
| `auth.interceptor.ts`        | **HTTP INTERCEPTOR:** <br>Send token to each HTTP requests and handle errors                                                      | `withLatestFrom` <br> `mergeMap` <br> `first` <br> `iif` <br> `delay` <br> `catchError` <br> `of` <br> `throwError` |
| `admin.guard.ts`             | **ROUTER GUARD:** <br>Guard to allow access to admin sonly <br> (used in `app-routing.module.ts`)                                 | Return `Observable`s in router guards                                                                               |
| `if-logged.directive.ts`     | **DIRECTIVE:** <br>Directive to render DOM when user is logged <br> (used in `navbar.component.ts`)                               | `distinctUntilChanged` <br> `takeUntil` <br> `Subject`                                                              |
| `if-role.directive.ts`       | **DIRECTIVE:** <br>Directive to render DOM by roleId <br> (used in `navbar.component.ts`)                                         | `distinctUntilChanged` <br> `takeUntil` <br> `Subject`                                                              | 

---

### OTHER EXAMPLES

| File                           | Goal                                                                                       | RxJS topic                                                                                                  |
|--------------------------------|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `users.component`              | **ROUTED COMPONENT:** <br>Multiple HTTP requests                                           | `forkjoin` <br> `map`                                                                                       |
| `users-details.component`      | **ROUTED COMPONENT:** <br> Handle Observable sequence to get user details by router params | `switchmap` <br> `map` <br> `activatedRoute.params`                                                         |
| `demo-async-pipe.component.ts` | **ROUTED COMPONENT:** <br> How to use async pipe to get the role name by using the roleId  |                                                                                                             |
| `role-name.pipe.ts`            | **ASYNC PIPE:** <br> async pipe to get the roleName by using the roleId                    | `timer` <br> `switchMap` <br> `map`                                                                         |
| `meteo.component.ts`           | **ROUTED COMPONENT:** <br> How to use RxJS operators in Reactive Forms                     | `filter` <br> `debounceTime` <br> `distinctUntilChanged` <br> `switchMap` <br> `map` <br> `catchError` <br> | 

