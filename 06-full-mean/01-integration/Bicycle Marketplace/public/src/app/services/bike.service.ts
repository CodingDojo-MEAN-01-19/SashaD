import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Bike } from '../models';
import { User } from '../models';

import 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  constructor(private readonly http: HttpClient) {}

  getBikes() {
    return this.http.get('/api/bikes');
  }
  getMyBikes() {
    return this.http.get('/api/bikes/mybikes');
  }
  createBike(bike: Bike) {
    return this.http.post('/api/bikes', bike);
  }

  removeBike(id: string) {
    return this.http.delete('/api/bikes/' + id);
  }

  updateBike(bike: Bike) {
    return this.http.put('/api/bikes/', bike);
  }
}
