import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Meteo } from '../../model/meteo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <pre>GOAL: use RxJS operators with Reactive Forms</pre>

    <div class="card text-center">
      <div class="card-header">
        <input
          class="form-control"
          type="text"
          placeholder="Search City"
          [formControl]="cityInput"
        />
      </div>

      <div *ngIf="meteo && !meteo.error" class="card-body">
        <div class="card-img-top">
          <img [src]="meteo.icon" alt="icon" height="100" width="100" />
        </div>
        <div class="card-title">
          {{ meteo.description }}
        </div>
        <div class="card-subtitle text-muted">
          {{ meteo.temperature }}°C
        </div>
      </div>

      <div *ngIf="meteo?.error">No city found</div>
    </div>
  `
})
export class MeteoComponent implements OnInit {
  meteo: Meteo | undefined = undefined;
  cityInput: FormControl = new FormControl();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.cityInput.valueChanges
      .pipe(
        filter((text) => text.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((text) =>
          this.http
            .get(
              `http://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&APPID=038c13b552fc22e48d6563104ac72fe4`
            )
            .pipe(
              map((meteo: any): Meteo => {
                return {
                  temperature: meteo.main.temp,
                  description: meteo.weather[0].main,
                  icon: 'http://openweathermap.org/img/w/' + meteo.weather[0].icon + '.png',
                  error: false
                };
              }),
              catchError(() => of({ error: true }))
            )
        )
      )
      .subscribe((result) => {
        this.meteo = result;
      });

    this.cityInput.setValue('Bari');
  }
}
