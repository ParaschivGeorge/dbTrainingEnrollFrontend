import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  currentUser = {
      name: 'Manager',
      email: 'manager@gmail.com'
  };

  training = {
    name: 'Design patterns',
    technology: 'Java 8',
    date: '2018-05-12 12:00-14:00',
    numberOfParticipants: 12
  };

  accounts: {
    name: string,
    email: string
  }[] = [
    {
      name: 'sub1',
      email: 'sub1@gmail.com'
    },
    {
      name: 'sub2',
      email: 'sub2@gmail.com'
    },
    {
      name: 'sub3',
      email: 'sub3@gmail.com'
    }
  ];
}
