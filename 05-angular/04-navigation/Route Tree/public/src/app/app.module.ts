import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/detail/detail.component';
import { BrandComponent } from './product/brand/brand.component';
import { CategoryComponent } from './product/category/category.component';

import { ReviewComponent } from './review/review.component';
import { ReviewDetailComponent } from './review/detail/detail.component';
import { AuthorComponent } from './review/author/author.component';
import { AllreviewsComponent } from './review/allreviews/allreviews.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ReviewComponent,
    ProductDetailComponent,
    BrandComponent,
    CategoryComponent,
    AuthorComponent,
    AllreviewsComponent,
    ReviewDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
