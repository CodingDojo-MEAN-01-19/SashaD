import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PPM - Project Product Management';
  newProduct: any;
  products: [];
  errors: any;
  constructor(private _http: ProductService) { }
  ngOnInit() {}
}
