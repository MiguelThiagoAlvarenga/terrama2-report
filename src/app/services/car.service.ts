import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {


  urlCar = environment.terramaUrl + '/api/car';

  constructor(
    private http: HttpClient
  ) {}

  // getAll() {
  //   return this.http.get(this.urlCar + '/getAll').toPromise();
  // }

  getAllSimplified() {
    return this.http.get(this.urlCar + '/getAllSimplified').toPromise();
  }
}