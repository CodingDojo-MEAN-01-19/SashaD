import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { tap } from 'rxjs/operators';

import { User } from '../models';
import { calcBindingFlags } from '@angular/core/src/view/util';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthed$ = new BehaviorSubject<boolean>(this.isAuthed());

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  login(user: User) {
    return this.http
      .post('/api/user/login', user)
      .pipe(tap(() => this.isAuthed$.next(true)));
  }

  register(user: User) {
    return this.http
      .post('/api/user/register', user)
      .pipe(tap(() => this.isAuthed$.next(true)));
  }

  logout() {
    return this.http.delete('/api/user/logout').pipe(
      tap(() => this.isAuthed$.next(false)),
      tap(() => this.cookieService.removeAll())
    );
  }
  session(cb) {
    this.http.get('/api/user/session')
      .subscribe(id => cb(id));
  }
  findById(id, cb) {
    this.http.get('/api/user/' + id)
      .subscribe(data => cb(data));
  }

  isAuthed(): boolean {
    const expired = parseInt(this.cookieService.get('expiration'), 10);
    const userID = this.cookieService.get('userID');
    const session = this.cookieService.get('session');

    return Boolean(expired && userID && session && expired > Date.now());
  }
}
