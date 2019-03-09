import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author-services/author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { del } from 'selenium-webdriver/http';

@Component({
  selector: 'app-author-quotes',
  templateUrl: './author-quotes.component.html',
  styleUrls: ['./author-quotes.component.css'],
})
export class AuthorQuotesComponent implements OnInit {
  authorId: any;
  currentAuthor: any;
  authorName: any;
  errors: any;
  votes: any;
  quotes: any;
  quote: any;
  editQuote: any;
  constructor(
    private _http: AuthorService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}
  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => (this.authorId = params.get('id'))
    );
    const findAuthor = this._http.getAuthor(this.authorId);
    findAuthor.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.currentAuthor = data['author'];
        // console.log('Author here: ' + this.currentAuthor.name);
        this.authorName = this.currentAuthor.name;
        this.quotes = this.currentAuthor['quotes'];
        // console.log('Quotes: ' + JSON.stringify(this.quotes[0]));
        for (this.quote of this.quotes) {
          this.votes = this.quote['votes'];
        }
      }
    });
  }
  refresh() {
    this.router.navigate(['/quotes/' + this.authorId]);
    this.ngOnInit();
  }
  voteup(quote) {
    quote.votes += 1;
    // console.log('votes: ', quote.votes);
    // console.log('Quote: ' + JSON.stringify(quote));
    const votingU = this._http.voteQuote(this.authorId, quote);
    votingU.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        // console.log('Made it this far ' + data);
        this.errors = '';
        this.refresh();
      }
    });
  }
  votedown(quote) {
    quote.votes -= 1;
    const votingU = this._http.voteQuote(this.authorId, quote);
    votingU.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        // console.log('Made it this far ' + data);
        this.errors = '';
        this.refresh();
      }
    });
  }
  deletequote(quote) {
    // console.log(quote.id);
    // console.log('component: ' + this.currentAuthor._id);
    const deleteQ = this._http.deleteQuote(quote._id, this.currentAuthor);
    deleteQ.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        // console.log('Made it this far ' + data);
        this.errors = '';
        this.refresh();
      }
    });
  }
}
