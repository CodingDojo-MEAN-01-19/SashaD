import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  addProduct(newProduct) {
    console.log('*Made it to new product creation*');
    return this._http.post('/products/new', newProduct);
  }
  getProduct(id, editProduct) {
    console.log('*Made it to edit product*');
    return this._http.put('/products/edit/' + id, editProduct);
  }
  getProducts() {
    console.log('*Made it to get all products*');
    return this._http.get('/products');
  }
  destroyProduct(id): Observable<Product> {
    console.log('*Made it to delete a product with id: ' + id);
    const url = '/products'
    return this._http.delete<Product>(url);
  }
}
