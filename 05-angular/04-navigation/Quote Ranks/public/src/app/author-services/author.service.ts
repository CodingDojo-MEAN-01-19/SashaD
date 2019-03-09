import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private _http: HttpClient) {}
  getAuthors() {
    return this._http.get('/authors');
  }
  addAuthor(newAuthor) {
    return this._http.post('/authors/new', newAuthor);
  }
  getAuthor(id) {
    return this._http.get('/authors/' + id);
  }
  editAuthor(id, Authoredit) {
    return this._http.put('/authors/' + id, Authoredit);
  }
  addQuote(id, Quoteobject) {
    return this._http.put('/authors/quotes/' + id, Quoteobject);
  }
  voteQuote(id, vote) {
    return this._http.patch('/authors/quotes/vote/' + id, vote);
  }
  deleteQuote(id, auth) {
    // console.log('Did we get here service this is the quote id? ' + id);
    // console.log('Here is the auth ' + JSON.stringify(auth));
    return this._http.put('/authors/quotes/delete/' + id, auth);
  }
}
