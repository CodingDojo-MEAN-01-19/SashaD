import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-burbank',
  templateUrl: './burbank.component.html',
  styleUrls: ['./burbank.component.css'],
})
export class BurbankComponent implements OnInit {
  city: any;
  constructor(private _http: HttpService) {}
  ngOnInit() {
    this._http.getBurbank().subscribe(data => this.city = data);
  };

}
