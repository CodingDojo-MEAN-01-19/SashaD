import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  tasks: [];
  singletask: [];
  constructor(private _http: HttpService) {}
  ngOnInit() {
    this.getTasksFromService();
    this.getTasksFromService();
  }
  getTasksFromService() {
    let observable = this._http.getTasks();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(data);
      this.tasks = data['tasks'];
    });
  }
}
