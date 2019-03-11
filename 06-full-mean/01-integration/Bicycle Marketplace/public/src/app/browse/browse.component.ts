import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UserService, BikeService } from '../services';
import { Bike } from '../models';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  bikes: any;
  contactdetails: Bike;
  str;
  strsearch;
  currentUser;

  private subscription: Subscription;

  constructor(
    private readonly _userService: UserService,
    private readonly _bikeService: BikeService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

  ngOnInit() {
    this.strsearch = '';
    this.getAllBikes();
  }
  getAllBikes() {
    this._bikeService.getBikes().subscribe(bikes => {
      this.bikes = bikes['bikes'];
      console.log('This should be all the bikes ' + this.bikes[0]['userid']);
      console.log('This should be the userid ' + bikes['userid']);
      this.currentUser = bikes['userid'];
    });
  }
  contact(contactdetails) {
    console.log('I am in contact! ');
    console.log(contactdetails);

    alert('hello');
  }
  onDelete(id) {
    event.preventDefault();
    this.subscription = this._bikeService
      .removeBike(id)
      .subscribe(deleteBike => {
        console.log('This is the deleted bike: ' + deleteBike);
      });
  }
}
