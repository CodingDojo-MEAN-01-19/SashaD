import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author-services/author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.css'],
})
export class CreateQuoteComponent implements OnInit {
  authorId: number;
  newQuote: any;
  errors: any;
  currentAuthor: any;
  authorName: any;
  constructor(
    private _http: AuthorService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => (this.authorId = parseInt(params.get('id'), 10))
    );
    const findAuthor = this._http.getAuthor(this.authorId);
    findAuthor.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.currentAuthor = data['author'];
        this.authorName = this.currentAuthor['name'];
      }
    });
    this.newQuote = { content: '' };
  }
  createQuote(id, newQuote) {
    const create = this._http.addQuote(this.authorId, this.newQuote);
    create.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.router.navigateByUrl('/quotes/' + this.authorId);
      }
    });
  }
  GoBack() {
    this.router.navigateByUrl('/quotes/' + this.authorId);
  }
}
