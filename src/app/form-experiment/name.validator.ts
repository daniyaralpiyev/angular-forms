import { Injectable, inject } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Observable, map, delay} from 'rxjs';

export interface Profile {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class NameValidator implements AsyncValidator {

  http = inject(HttpClient);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http.get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts')
      .pipe(
        delay(1000),
        map(users => {
          return users.filter((u: Profile) => u.firstName === control.value).length > 0
            ? { nameValid: { message: `Имя должно быть одним из списка: ${users.map((u: Profile) => u.firstName).join(', ')}` } }
            : null;
        })
      );
  }
}
