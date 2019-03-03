import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
// This is to get the authors to print to the express port
export class HttpService {
  constructor(private _http: HttpClient) {
    this.getAuthors();
  }
  getAuthors() {
    console.log('We got here');
    // This is the port that express is running on
    const authors = this._http.get('http://localhost:5000');
    authors.subscribe(data => {
      // To see all the authors in the console
      console.log(data);
      // console.log(`${data}`);
    });
  }
}
