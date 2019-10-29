import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService {


  urlRegion = environment.terramaUrl + '/api/city';

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get(this.urlRegion + '/getAll').toPromise();
  }
}
