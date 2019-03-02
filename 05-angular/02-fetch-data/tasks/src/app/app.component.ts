import { Component } from '@angular/core';

import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tasks';
  task = new Task();
  tasks: Task[] = [];
}
