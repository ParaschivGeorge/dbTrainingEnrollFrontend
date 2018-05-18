import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.newNoticationsList = [];
    this.userService.getAllNotifications().subscribe(
      allNotifications => {
        this.userService.allNoticationsList = allNotifications;
        console.log(this.userService.allNoticationsList);
      },
      error => {
        console.log(error);
      }
    );
  }

}
