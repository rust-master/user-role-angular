import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<Observable<User[]>> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User[]> {
    // This will trigger the HTTP request and return the observable of users
    return this.userService.getUsers();
  }
}
