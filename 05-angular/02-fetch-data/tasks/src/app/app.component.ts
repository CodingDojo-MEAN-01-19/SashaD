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
  constructor(private _httpService: HttpService) {}
  ngOnInit() {}
  onButtonTasksClick(): void {
    console.log(`Click event is working!`);
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(data);
      this.tasks = data['tasks'];
    });
    // call the service's method to post the data, but make sure the data is bundled up in an object!
  }
  onButtonShowClick(task): void {
    console.log(`Click event is working!`);
    this.singletask = task['task'];
    // call the service's method to post the data, but make sure the data is bundled up in an object!
  }
}
