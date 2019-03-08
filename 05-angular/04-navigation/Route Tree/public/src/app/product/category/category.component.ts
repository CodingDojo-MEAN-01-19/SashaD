import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: any;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => this.category = params.get("cat") );
  }

}
