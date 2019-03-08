import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-allreviews',
  templateUrl: './allreviews.component.html',
  styleUrls: ['./allreviews.component.css']
})
export class AllreviewsComponent implements OnInit {
  num: any;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => this.num = params.get("id") );
    // this._route.paramMap.subscribe((params: ParamMap): void => console.log('Child ID changed:', params.get("id")));
    // Well that was not as easy as the platform made it seem....
  }

}
