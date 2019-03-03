import { Component } from '@angular/core';

import { Author } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'books-api';
  author = new Author();
  authors: Author[] = [];
}
