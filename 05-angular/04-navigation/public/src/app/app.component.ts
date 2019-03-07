import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dojo Weather Forecast';
  cities = [
    { name: 'Seattle', id: 5809844 },
    { name: 'DC', id: 4138106 },
    { name: 'Burbank', id: 4885983 },
    { name: 'San Jose', id: 5392171 },
    { name: 'Dallas', id: 4190598 },
    { name: 'Chicago', id: 4887398 }
  ];
  // city: any = this.cities[0]['id'];
  constructor(private _http: HttpService) { }
  // url: string = this.route['_routerState'].snapshot.url;
  // newArr: any;
  ngOnInit() {
    // this.newArr = this.url.split(''); // or newStr = [...str];
    // this.newArr.splice(0,1);
    // this.newArr = this.newArr.join('');
    // console.log("This is the url from the app side " + this.newArr);
    // this._http.getCity(this.newArr).subscribe(data => this.city = data);
  }
}
