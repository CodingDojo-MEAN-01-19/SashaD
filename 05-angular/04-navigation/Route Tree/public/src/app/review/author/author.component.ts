import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  num: any;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => this.num = params.get("id") );
  }

}
