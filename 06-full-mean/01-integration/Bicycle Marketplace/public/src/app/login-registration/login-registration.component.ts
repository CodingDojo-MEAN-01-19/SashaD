import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models';
import { UserService } from '../services';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css'],
})
export class LoginRegistrationComponent implements OnInit {
  Nuser = new User();
  user = new User();
  errors: string[] = [];
  registrationErrors: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly auth: UserService
  ) {}

  ngOnInit() {
    console.log(this.auth);
  }

  onSubmit(user: User) {
    console.log('Loggin in from component ', user);
    this.auth.login(user).subscribe(
      loggedUser => {
        console.log('Logged user in ', loggedUser);
        this.router.navigateByUrl('/listings');
      },
      error => {
        console.log('Got an error logging in ', error.error);
        this.handleErrors(error.error);
      }
    );
  }
  onSubmitRegistration(Nuser: User) {
    console.log('user ', Nuser);
    this.auth.register(Nuser).subscribe(
      registeredUser => {
        console.log('Registered user: ' + registeredUser);

        this.router.navigateByUrl('/listings');
      },
      error => {
        console.log('Got an error registering ', error.error);
        this.handleRegErrors(error.error);
      }
    );
  }

  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
  private handleRegErrors(errors: string[] | string) {
    this.registrationErrors = Array.isArray(errors) ? errors : [errors];
  }
}
