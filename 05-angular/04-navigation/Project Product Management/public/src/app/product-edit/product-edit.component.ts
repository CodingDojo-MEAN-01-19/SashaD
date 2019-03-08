import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  errors: any;
  productId: any;
  Productedit: any;
  constructor(
    private _http: ProductService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => (this.productId = params.get('id'))
    );
    console.log('The url param for the edit is: ' + this.productId);
    const findproduct = this._http.getProduct(this.productId);
    findproduct.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.Productedit = data['product'];
      }
    });
  }
  changeProduct(Productedit) {
    console.log(`Click event is working to edit task!`, this.Productedit);
    const create = this._http.editProduct(this.productId, this.Productedit);
    create.subscribe(data => {
      // console.log('Creating new task', data);
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.router.navigateByUrl('/products');
        this.errors = '';
        this.Productedit = { title: '', price: '', url: '' };
      }
    });
  }
  onDelete(id) {
    const deletion = this._http.destroyProduct(id);
    deletion.subscribe(data => {
      console.log('Got the product to delete: ', data);
      this.router.navigateByUrl('/products', { skipLocationChange: true });
    });
  }
}
