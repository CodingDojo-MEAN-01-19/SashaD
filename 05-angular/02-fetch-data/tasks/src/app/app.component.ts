import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  tasks: [];
  singletask: [];
  // This checks against whether the task is completed so if it is false it says one statement in the html
  // if not then it shows the other
  iscompleted: boolean;
  // Added feature to only show box for clicked on tasks after the show button has been clicked
  show: boolean = false;
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
    console.log(`Click event is working for single task!`, task);
    console.log(`The task is completed`, task['completed']);
    this.singletask = task;
    this.iscompleted = task['completed'];
    this.show = true;
    // call the service's method to post the data, but make sure the data is bundled up in an object!
  }
}
