import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutoCompleteService {
  constructor(private http: HttpClient) {}

  getData(query: any) {
    if (query === '') {
      return of([]);
    }
    return this.http
      .get('https://jsonplaceholder.typicode.com/users?q=' + query)
      .pipe(debounceTime(300))
      .pipe(map((response: any) => response.map((item: any) => item['name'])));
  }
}
