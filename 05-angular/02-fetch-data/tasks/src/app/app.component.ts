import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Task } from './models';

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
  editTask: any;
  errors: any;
  // This checks against whether the task is completed so if it is false it says one statement in the html
  // if not then it shows the other

  // Added feature to only show box for clicked on tasks after the show button has been clicked
  show = false;
  formShow = false;
  editFormShow = false;
  iscompleted;
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.newTask = { title: '', description: '' };
    this.editTask = Task;
  }
  onButtonTasksClick(): void {
    console.log(`Click event is working!`);
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(data);
      // this closes all excess boxes open
      this.tasks = data['tasks'];
      this.show = false;
      this.formShow = false;
      this.editFormShow = false;
    });
    // call the service's method to post the data, but make sure the data is bundled up in an object!
  }
  onButtonShowClick(task) {
    this.singletask = task;
    const showingTask = this._httpService.showTask(this.singletask);
    showingTask.subscribe(data => {
      // console.log('Getting the task', data);
      this.show = true;
      this.iscompleted = task['completed'];
      this.singletask = data['task'];
      // console.log(data['task']);
    });
    // call the service's method to post the data, but make sure the data is bundled up in an object!
  }
  onShowForm() {
    this.formShow = true;
  }
  onShowEdit(task) {
    this.editFormShow = true;
    this.editTask = task;
  }
  onSubmit(newTask) {
    const createTask = this._httpService.addTask(this.newTask);
    createTask.subscribe(data => {
      // console.log('Creating new task', data);
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.onButtonTasksClick();
        this.newTask = { title: '', description: '' };
      }
    });
  }
  onSubmitEdit(editTask) {
    // It doesn't like the id's that were created automatically through mongo but makes the edit
    console.log(`Click event is working to edit task!`, this.editTask);
    const edittingTask = this._httpService.editTask(this.editTask);
    edittingTask.subscribe(data => {
      console.log('Editing task', data);
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.onButtonTasksClick();
        this.editFormShow = false;
      }
    });
  }
  onDelete(task) {
    this.singletask = task;
    console.log(`Delete button event is working!`, this.singletask);
    const deletingTask = this._httpService.deleteTask(this.singletask);
    deletingTask.subscribe(data => {
      console.log('Deleting task', data);
      this.onButtonTasksClick();
    });
  }
  // Code to send off the form data (this.newTask) to the Service
  // ...
  // Reset this.newTask to a new, clean object.
}
