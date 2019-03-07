import { CityComponent } from './city/city.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '5809844', component: CityComponent },
  { path: '5392171', component: CityComponent },
  { path: '4885983', component: CityComponent },
  { path: '4190598', component: CityComponent },
  { path: '4138106', component: CityComponent },
  { path: '4887398', component: CityComponent },
// redirect to seattle for now
  { path: '', pathMatch: 'full', redirectTo: '5809844' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
