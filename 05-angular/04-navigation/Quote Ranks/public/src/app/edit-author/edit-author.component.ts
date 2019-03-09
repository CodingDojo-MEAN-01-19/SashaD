import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author-services/author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
})
export class EditAuthorComponent implements OnInit {
  Authoredit: any;
  errors: any;
  authorId: any;
  constructor(
    private _http: AuthorService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => (this.authorId = params.get('id'))
    );
    const findauthor = this._http.getAuthor(this.authorId);
    findauthor.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.Authoredit = data['author'];
      }
    });
  }
  editA() {
    const editA = this._http.editAuthor(this.authorId, this.Authoredit);
    editA.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
        console.log(this.errors);
      } else {
        this.router.navigateByUrl('/');
        this.errors = '';
        this.Authoredit = { name: '' };
      }
    });
  }
  GoBack() {
    this.router.navigateByUrl('/');
  }
}
