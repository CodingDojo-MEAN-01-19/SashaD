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
  allCakes: [];
  newCake: any;
  newReview: any;
  currentCakeForNested: any;
  cake: any;
  errors: any;
  constructor(private _httpService : HttpService) {
  }

  ngOnInit() {
    this.allCakes = [];
    this.currentCakeForNested = { id: '', ratings: [] };
    this.newCake = { baker: '', url: '' };
    this.newReview = { stars: '', comment: '', id: '' };
    this.getAllCakes();
  }

  getAllCakes() {
    const allCakes = this._httpService.getAllCakes();
    allCakes.subscribe(data => {
      this.allCakes = data['cakes'];
      for (this.cake of this.allCakes) {
        let sumStars = 0
        for (this.cake.ratings of this.allCakes['_ratings']) {
          sumStars += this.cake._ratings.stars;
        }
        if (sumStars === 0) {
          this.cake.avgStars = 0;
        } else {
          this.cake.avgStars = sumStars / this.cake._ratings.length;
        }
      }
      console.log(this.allCakes);
    });
  }
  makeNewCake() {
    const myCake = this._httpService.makeNewCake(this.newCake);
    myCake.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.newCake = { baker: '', url: '' };
      }
    });
  }

  addNewReview(id) {
    this.newReview.id = id;
    this.computeAverageReviews(id, this.newReview.stars);
    const myReview = this._httpService.makeNewReview(this.newReview);
    myReview.subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.errors = '';
        this.newReview = { stars: '', comment: '' };
      }
    });
  }

  viewCake(id) {
    for (this.cake of this.allCakes) {
      if (this.cake.id === id) {
        this.currentCakeForNested = this.cake;
      }
    }
    console.log(this.currentCakeForNested);
  }

  computeAverageReviews(id, stars) {
    for (this.cake of this.allCakes) {
      if (this.cake._id === id) {
        let sumStars = 0;
        for (this.cake of this.allCakes) {
          sumStars += this.cake._ratings.stars;
        }
        sumStars += parseInt(stars, 10);
        console.log(sumStars);
        this.cake.avgStars = (sumStars / (this.cake._ratings.length + 1));
        console.log(this.cake.avgStars);
      }
    }
  }
}
