import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Task } from './task.interface'; // from instructor jason

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) {}
  GetAllTasks() {
    let tempObservable = this._http.get('/tasks');
    return tempObservable.subscribe(data => console.log('Got our tasks!', data));
  }
  GetOneTask(id) {
    let tempObservable = this._http.get('/tasks/' + id);
    tempObservable.subscribe(data => console.log('Got the task', data));
  }
  CreateTask(newtask) {
    let tempObservable = this._http.post('/tasks', newtask);
    tempObservable.subscribe(data => console.log('Tried to create a task!', data));
  }
  DeleteTask(id) {
    let tempObservable = this._http.delete('/tasks/' + id);
    tempObservable.subscribe(data => console.log('Deleted a task!', data));
  }
  UpdateTask(EditTask) {
    let tempObservable = this._http.put('tasks/' + EditTask._id, EditTask);
    tempObservable.subscribe(data => console.log('Updated a task!', data));
  }
}
