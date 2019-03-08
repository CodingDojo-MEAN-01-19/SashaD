import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;
  errors: any;
  editProduct: any;
  constructor(private _http: ProductService, private router: Router) {}
  refresh() {
    this.router.navigate(['/products']);
    this.ngOnInit();
  }
  ngOnInit() {
    const observable = this._http.getProducts();
    observable.subscribe(data => {
      console.log('Got our data! ', data);
      this.products = data['products'];
    });
  }
  onShowEdit(product) {
    this.router.navigateByUrl('/products/edit/' + product._id);
    this.editProduct = product;
  }
  onDelete(id) {
    const deletion = this._http.destroyProduct(id);
    deletion.subscribe(data => {
      console.log('Got the product to delete: ', data);
      this.refresh();
    });
  }
}
