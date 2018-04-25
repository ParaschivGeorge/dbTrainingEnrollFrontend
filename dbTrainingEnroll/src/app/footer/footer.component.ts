import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerText: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedIn.subscribe(result => {
      this.footerText = this.userService.currentUser.name + '<br>Last Login Date: '
  + this.userService.currentUser.lastLoginDate;
    });
  }
}
