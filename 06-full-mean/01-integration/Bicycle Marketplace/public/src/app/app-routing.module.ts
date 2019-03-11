import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { BrowseComponent } from './browse/browse.component';
import { ListingsComponent } from './listings/listings.component';

const routes: Routes = [
  { path: '', component: LoginRegistrationComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'listings', component: ListingsComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: LoginRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
