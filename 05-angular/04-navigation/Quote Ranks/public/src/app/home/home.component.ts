import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author-services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  authors: any;
  errors: any;
  editAuthor: any;

  constructor(private _http: AuthorService, private router: Router) {}

  ngOnInit() {
    const observable = this._http.getAuthors();
    observable.subscribe(data => {
      console.log('Got our data! ', data);
      this.authors = data['authors'];
    });
  }
  onShowQuotes(id) {
    this.router.navigateByUrl('/quotes/' + id);
  }
  onEditAuthor(id) {
    this.router.navigateByUrl('/edit/' + id);
  }
}
