import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onConfirm() {
    this.userService.closeDeleteDialog.emit(true);
  }

  onClose() {
    this.userService.closeDeleteDialog.emit(false);
  }

}
