import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { Product } from '../models';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  addProduct(newProduct) {
    console.log('*Made it to new product creation*');
    return this._http.post('/api/products/new', newProduct);
  }
  getProduct(id) {
    console.log('*Made it to edit product*');
    return this._http.get('/api/products/edit/' + id);
  }
  editProduct(id, Productedit) {
    console.log('*We are trying to submit the edit*');
    return this._http.put('/api/products/edit/' + id, Productedit);
  }
  getProducts() {
    console.log('*Made it to get all products*');
    return this._http.get('/api/products');
  }
  destroyProduct(id) {
    console.log('*Made it to delete a product with id: ' + id);
    return this._http.delete('/api/products/' + id);
  }
}
