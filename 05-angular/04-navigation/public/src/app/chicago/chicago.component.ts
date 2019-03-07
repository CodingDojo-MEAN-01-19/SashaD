import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css'],
})
export class ChicagoComponent implements OnInit {
  city: any;
  constructor(private _http: HttpService) {}
  ngOnInit() {
    this._http.getChicago().subscribe(data => this.city = data);
  };

}
