import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Author } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'books-api';
  constructor(private _httpService: HttpService) {}
  author = new Author();
  authors: Author[] = [];
}
