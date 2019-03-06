import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Cake } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Rate My Cake!';
  newCake: any;
  cakes: [];
  errors: any;
  show = false;
  constructor(private _httpService: HttpService){}
  ngOnInit() {
    this.newCake = { bakerName: '', imageUrl: '' };
    const observable = this._httpService.getCakes();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      // console.log(data);
      // this closes all excess boxes open
      this.cakes = data['cakes'];
      this.show = false;
    });
  }
  createCakeFromService(newCake) {
    console.log("We got the cake", this.newCake);
    const createTask = this._httpService.addCake(this.newCake);
    createTask.subscribe(data => {
      // console.log('Creating new task', data);
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.newCake = { bakerName: '', imageUrl: '' };
      }
    });
  }
}
