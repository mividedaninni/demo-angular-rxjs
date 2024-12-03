import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {
  constructor(private http: HttpClient) {
  }

  uniqueName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // debounce
      return timer(1000).pipe(
        // check if username exits
        switchMap(() => this.http.get<User>(`http://localhost:3000/users?name=${control.value}`)),
        map((res) => {
          return res ? null : { userNotExists: true };
        })
      );
    };
  }
}
