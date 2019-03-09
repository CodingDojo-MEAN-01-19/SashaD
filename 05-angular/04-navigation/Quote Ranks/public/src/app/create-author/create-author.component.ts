import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author-services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css'],
})
export class CreateAuthorComponent implements OnInit {
  newAuthor: any;
  errors: any;
  constructor(private _http: AuthorService, private router: Router) {}

  ngOnInit() {
    this.newAuthor = { name: '' };
  }
  createAuthor(newAuthor) {
    const create = this._http.addAuthor(this.newAuthor);
    create.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.router.navigateByUrl('/');
        this.errors = '';
        this.newAuthor = { name: '' };
        // console.log('Here is the author if it worked: ' + this.newAuthor);
      }
    });
  }
  GoBack() {
    this.router.navigateByUrl('/');
  }
}
