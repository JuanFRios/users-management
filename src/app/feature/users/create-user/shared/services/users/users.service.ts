import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IcreateUserRequest, IlistUsersResponse } from '@feature/users/models/user.model';

/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.API;

  constructor(
    private http: HttpClient,
  ) { }
  
  getUsers(): Promise<IlistUsersResponse> {
    return this.http.get<IlistUsersResponse>(`${this.apiUrl}/users`).toPromise();
  }

  createUser(user: IcreateUserRequest) {
    return this.http.post(`${this.apiUrl}/users`, user).toPromise();
  }

  deleteUserForIndex(index: number) {
    return this.http.delete(`${this.apiUrl}/users/${index}`).toPromise();
  }
}
