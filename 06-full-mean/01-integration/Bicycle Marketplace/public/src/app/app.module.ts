import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';
import { BikeService } from './services/bike.service';

import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { ListingsComponent } from './listings/listings.component';
import { BrowseComponent } from './browse/browse.component';
import { SearchPipe } from './browse/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegistrationComponent,
    ListingsComponent,
    BrowseComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CookieModule.forRoot(),
  ],
  providers: [UserService, BikeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
