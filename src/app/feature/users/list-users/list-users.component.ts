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

  constructor(private usersService: UsersService,) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().then((res) => {
      console.log(res);
      this.users = res.data;
    })
  }

  public deleteUser(index: number): void {
    this.usersService.deleteUserForIndex(index).then((res) => {
      console.log(res);
      this.users= this.users.filter((user) => user.id !== index);
    })
  }

}
