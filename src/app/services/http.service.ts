import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(
    private http: HttpClient
  ) {}

  get(url, parameters = {}) {
    if (!url) {
      return;
    }
    return this.http.get<object[]>(url, {
      params: parameters
    }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  post(url, parameters = {}) {
    if (!url) {
      return;
    }
    return this.http.post<any[]>(url, {
      params: parameters
    }).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(`Error occured: ${error.message}`);
  }

}
