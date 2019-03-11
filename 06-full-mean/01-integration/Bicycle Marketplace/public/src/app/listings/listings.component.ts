import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { BikeService } from '../services';
import { Bike } from '../models';
import { Subscription } from 'rxjs';
import { bloomHasToken } from '@angular/core/src/render3/di';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
})
export class ListingsComponent implements OnInit, OnDestroy {
  @Input() bike;
  @Output() emitter = new EventEmitter();

  bikes: any;
  eBike: any;
  private subscription: Subscription;

  constructor(
    private readonly bikeService: BikeService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.bikeService.getBikes().subscribe(bikes => {
      this.bikes = bikes['bikes'];
      console.log(this.bikes);
    });
    console.log(localStorage.getItem('userId'));
  }

  ngOnDestroy() {
    console.log('closing sub');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onCreate(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('creating a bike ', this.bike);

    this.subscription = this.bikeService
      .createBike(this.bike)
      .subscribe(newBike => {
        console.log('This is the new bike: ' + newBike);
      });
    form.reset();
  }
  onEdit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('editing bike listing ', this.eBike);

    this.subscription = this.bikeService
      .updateBike(this.eBike)
      .subscribe(edBike => {
        console.log('This is the editted bike: ' + edBike);
        this.router.navigateByUrl('/listings');
      });
    this.eBike = new Bike();
    form.reset();
  }
  onDelete(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('deleting bike listing ', this.eBike);

    this.subscription = this.bikeService
      .removeBike(this.eBike)
      .subscribe(deleteBike => {
        console.log('This is the deleted bike: ' + deleteBike);
        this.router.navigateByUrl('/listings');
      });
  }
}
