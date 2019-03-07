import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service'
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { splitClasses } from '@angular/compiler';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _http: HttpService) { }
  url: string = this.route['_routerState'].snapshot.url;
  city: any;
  newArr: any;
  ngOnInit() {
    this.newArr = this.url.split(''); // or newStr = [...str];
    this.newArr.splice(0,1);
    this.newArr = this.newArr.join('');
    console.log("This is the url " + this.newArr);
    this._http.getCity(this.newArr).subscribe(data => this.city = data);
  }

}
