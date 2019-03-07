import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sanjose',
  templateUrl: './sanjose.component.html',
  styleUrls: ['./sanjose.component.css'],
})
export class SanjoseComponent implements OnInit {
  city: any;
  constructor( private _http: HttpService) {}
  ngOnInit() {
    this._http.getSanjose().subscribe(data => this.city = data);
  };
}
