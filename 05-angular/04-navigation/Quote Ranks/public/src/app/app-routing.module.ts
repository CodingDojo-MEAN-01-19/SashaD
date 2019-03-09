import { HomeComponent } from './home/home.component';
import { AuthorQuotesComponent } from './author-quotes/author-quotes.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// These routes directly use the city id for the api request so that the get request can insert the id into the url
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quotes/:id', component: AuthorQuotesComponent },
  { path: 'new', component: CreateAuthorComponent },
  { path: 'write/:id', component: CreateQuoteComponent },
  { path: 'edit/:id', component: EditAuthorComponent },
  // redirect to seattle for now
  { path: '', pathMatch: 'full', redirectTo: '' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: HomeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
