import { Component, OnInit } from '@angular/core';
import {Training} from "../models/training";
import {ApiService} from "../services/api.service";
import {UserService} from "../services/user.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['../dashboard/dashboard.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateY(40%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(10%)', offset: 0.8}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateY(40%)', offset: 0}),
          style({opacity: 0.5, transform: 'translateY(10%)', offset: 0.8}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class UserTrainingsComponent implements OnInit {

  allMyTrainings: Training[];

  constructor(private apiService: ApiService,
              private userService: UserService) { }

  ngOnInit() {
    this.apiService.getUserTrainings().subscribe(
      result => {
        this.allMyTrainings = result;
      }
    )
  }
}
