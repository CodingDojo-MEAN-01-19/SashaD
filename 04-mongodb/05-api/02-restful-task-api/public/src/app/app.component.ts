import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private _httpService: HttpService){}
}
//TO see this change! go into the workspace directory and launch the application
//Launch using => ng serve --open
//The open flag opens a browser to http://localhost:4200
