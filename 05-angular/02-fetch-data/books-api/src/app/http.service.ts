import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {
    this.getAuthors();
  }
  getAuthors() {
    console.log('We got here');
    const authors = this._http.get('http://localhost:5000/authors');
    authors.subscribe(data => {
      console.log(data);
      console.log(`${data}`);
    });
  }
}
