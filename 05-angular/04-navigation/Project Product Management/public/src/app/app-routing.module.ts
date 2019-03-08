import { HomeComponent } from './home/home.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component'

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// These routes directly use the city id for the api request so that the get request can insert the id into the url
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/new', component: ProductCreateComponent },
// redirect to seattle for now
  { path: '', pathMatch: 'full', redirectTo: '' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
