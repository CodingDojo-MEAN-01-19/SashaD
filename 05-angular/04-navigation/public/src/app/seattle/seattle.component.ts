import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css'],
})
export class SeattleComponent implements OnInit {
  city: any;
  constructor(private _http: HttpService) { };
  ngOnInit() {
    this._http.getSeattle().subscribe(data => this.city = data);

  }

}
