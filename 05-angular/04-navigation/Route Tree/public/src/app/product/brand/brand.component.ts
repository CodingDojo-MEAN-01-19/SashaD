import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brand: any;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => this.brand = params.get("brand") );
  }

}
