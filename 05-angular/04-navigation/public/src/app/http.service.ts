import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }

  getSanjose() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=5392171&APPID=787ca2a5c6ceef4166e2d53e650e6a14&units=imperial');
  };
  getSeattle() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=5809844&APPID=787ca2a5c6ceef4166e2d53e650e6a14&units=imperial');
  };
  getDc() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=4138106&APPID=787ca2a5c6ceef4166e2d53e650e6a14&units=imperial');
  };
  getDallas() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=4190598&APPID=787ca2a5c6ceef4166e2d53e650e6a14&units=imperial');
  };
  getChicago() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=4887398&APPID=787ca2a5c6ceef4166e2d53e650e6a14&units=imperial');
  };
  getBurbank() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=4885983&APPID=787ca2a5c6ceef4166e2d53e650e6a14&units=imperial');
  };

}
