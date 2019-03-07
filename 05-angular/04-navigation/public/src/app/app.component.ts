import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dojo Weather Forecast';
  city: any;
  constructor(private _http: HttpService) { }
  ngOnInit() {
    this.onSeattleClick();
  }
  onSeattleClick() {
    const observable = this._http.getSeattle();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(Object.keys(data));
      // console.log(data);
      // this closes all excess boxes open
      this.city = data;
      console.log('I can not get it to the page' + this.city);
    });
  }
  onChicagoClick() {
    const observable = this._http.getChicago();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(Object.keys(data));
      // console.log(data);
      // this closes all excess boxes open
      return this.city = data;
    });
  }
  onDcClick() {
    const observable = this._http.getDc();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(Object.keys(data));
      // console.log(data);
      // this closes all excess boxes open
      return this.city = data;
    });
  }
  onBurbankClick() {
    const observable = this._http.getBurbank();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(Object.keys(data));
      // console.log(data);
      // this closes all excess boxes open
      return this.city = data;
    });
  }
  onSanjoseClick() {
    const observable = this._http.getSanjose();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(Object.keys(data));
      // console.log(data);
      // this closes all excess boxes open
      return this.city = data;
    });
  }
  onDallasClick() {
    const observable = this._http.getDallas();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(Object.keys(data));
      // console.log(data);
      // this closes all excess boxes open
      return this.city = data;
    });
  }
}
