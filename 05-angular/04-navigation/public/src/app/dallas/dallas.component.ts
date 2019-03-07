import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dallas',
  templateUrl: './dallas.component.html',
  styleUrls: ['./dallas.component.css'],
})
export class DallasComponent implements OnInit {
  city: any;
  constructor(private _http: HttpService) {}
  ngOnInit() {
    this._http.getDallas().subscribe(data => this.city = data);
  };

}
