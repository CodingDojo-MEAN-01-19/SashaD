import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getTasks() {
    console.log('SUCCESS');
    return this._http.get('/tasks');
    // provide the url of your get route - make sure this is set up in your server!
  }
  addTask(newTask) {
    return this._http.post('/tasks/create', newTask);
  }
}
