import { Component, OnInit } from '@angular/core';
import { UsersService } from '../create-user/shared/services/users/users.service';
import { IuserResponse } from '../models/user.model';


@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  public users: IuserResponse[] = [];
  public filter: string = '';
  public confirmationMessages: string[] = [];

  constructor(private usersService: UsersService,) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().then((res) => {
      this.users = res.data;
    })
  }

  public deleteUser(index: number, userName: string ): void {
    this.usersService.deleteUserForIndex(index).then((res) => {
      this.users= this.users.filter((user) => user.id !== index);
      this.confirmationMessages.push('El usuario ' +userName+' ha sido eliminado con éxito.');
    })
  }

  closeConfirmationMessage(index: number): void {
    this.confirmationMessages.splice(index, 1);
  }

}
