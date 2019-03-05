import { Component, OnInit, Input } from '@angular/core'; // add Input to our imports

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() onButtonShowClick: any;
  @Input() iscompleted: any;
  // maybecompleted;
  // use the @Input decorator to indicate this comes from the parent
  constructor() {}
}
