import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AuthorService } from './author-services/author.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { AuthorQuotesComponent } from './author-quotes/author-quotes.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAuthorComponent,
    CreateQuoteComponent,
    AuthorQuotesComponent,
    EditAuthorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
