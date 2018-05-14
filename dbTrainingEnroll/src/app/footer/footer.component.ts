import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerText: string;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.loggedIn.subscribe(result => {
      this.footerText = 'Last Login Date: ' + this.userService.currentUser.lastLoginDate;
    });
  }
}
