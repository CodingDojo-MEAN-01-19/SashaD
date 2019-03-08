import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  newProduct: any;
  errors: any;
  constructor(private _http: ProductService, private router: Router) {}

  ngOnInit() {
    this.newProduct = { title: '', price: '', url: '' };
  }
  createProduct(newProduct) {
    const create = this._http.addProduct(this.newProduct);
    create.subscribe(data => {
      // console.log('Creating new task', data);
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.router.navigateByUrl('/products');
        this.errors = '';
        this.newProduct = { title: '', price: '', url: '' };
      }
    });
  }
  GoBack() {
    this.router.navigateByUrl('/products');
  }
}
