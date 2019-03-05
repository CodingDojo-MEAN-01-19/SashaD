import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Task } from './models';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  newTask: any;
  tasks: [];
  singletask: [];
  // This checks against whether the task is completed so if it is false it says one statement in the html
  // if not then it shows the other
  iscompleted: boolean;
  // Added feature to only show box for clicked on tasks after the show button has been clicked
  show: boolean = false;
  formShow: boolean = false;
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.newTask = { title: '', description: '' };
  }
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
  onShowForm() {
    this.formShow = true;
  }
  onSubmit(newTask) {
    let createTask = this._httpService.addTask(this.newTask);
    createTask.subscribe(data => {
      console.log('Creating new task', data);
      this.newTask = { title: '', description: '' };
    });
  }
  // Code to send off the form data (this.newTask) to the Service
  // ...
  // Reset this.newTask to a new, clean object.
}
