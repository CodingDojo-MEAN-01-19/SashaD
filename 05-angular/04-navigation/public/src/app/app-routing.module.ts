import { SeattleComponent } from './seattle/seattle.component';
import { SanjoseComponent } from './sanjose/sanjose.component';
import { DcComponent } from './dc/dc.component';
import { DallasComponent } from './dallas/dallas.component';
import { ChicagoComponent } from './chicago/chicago.component';
import { BurbankComponent } from './burbank/burbank.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'seattle', component: SeattleComponent },
  { path: 'sanjose', component: SanjoseComponent },
  { path: 'dc', component: DcComponent },
  { path: 'dallas', component: DallasComponent },
  { path: 'burbank', component: BurbankComponent },
  { path: 'chicago', component: ChicagoComponent },
// redirect to seattle for now
  { path: '', pathMatch: 'full', redirectTo: '/seattle' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
