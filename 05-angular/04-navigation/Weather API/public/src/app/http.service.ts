import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }

  getCity(id) {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?id=' + id + '&APPID=787ca2a5c6ceef4166e2d53e650e6a14&units=imperial')
  }
}
