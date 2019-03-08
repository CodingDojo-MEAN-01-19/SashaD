import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
  // below in cities the id's are attached so that in AppComponent html they will be available
  // in the loop that creates the router links, the names are also only for that loop
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
  constructor(private _http: HttpService) { }
  ngOnInit() {}
}
