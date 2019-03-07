import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dc',
  templateUrl: './dc.component.html',
  styleUrls: ['./dc.component.css'],
})
export class DcComponent implements OnInit {
  city: any;
  constructor( private _http: HttpService) {}
  ngOnInit() {
    this._http.getDc().subscribe(data => this.city = data);
  };

}
