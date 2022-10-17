import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { User } from './user.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    let users: User[] = [
      { id: 1, title: 'mr', firstName: 'Rohit', lastName: 'ware', dob: '1988-09-03', email: 'rohit@email.com', password: '123456', ascceptTerms: true },
      { id: 2, title: 'mr', firstName: 'raju', lastName: 'ware', dob: '1988-05-07', email: 'raju@email.com', password: '123456', ascceptTerms: true },
      { id: 3, title: 'mrs', firstName: 'gita', lastName: 'gite', dob: '1994-10-03', email: 'gita@email.com', password: '123456', ascceptTerms: true },
      { id: 4, title: 'mr', firstName: 'ravi', lastName: 'gore', dob: '1989-05-07', email: 'ravi@email.com', password: '123456', ascceptTerms: true }

    ];
    return { users };
  }
}

