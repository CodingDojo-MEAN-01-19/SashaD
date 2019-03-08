import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/detail/detail.component';
import { BrandComponent } from './product/brand/brand.component';
import { CategoryComponent } from './product/category/category.component';

import { ReviewComponent } from './review/review.component';
import { ReviewDetailComponent } from './review/detail/detail.component';
import { AuthorComponent } from './review/author/author.component';
import { AllreviewsComponent } from './review/allreviews/allreviews.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// These routes directly use the city id for the api request so that the get request can insert the id into the url
const routes: Routes = [
  { path: 'products', component: ProductComponent, children: [
      { path: 'details/:id', component: ProductDetailComponent },
      { path: 'brand/:brand', component: BrandComponent },
      { path: 'category/:cat', component: CategoryComponent }]
  },
  { path: 'reviews', component: ReviewComponent, children: [
      { path: 'details/:id', component: ReviewDetailComponent },
      { path: 'author/:id', component: AuthorComponent },
      { path: 'all/:id', component: AllreviewsComponent }]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
