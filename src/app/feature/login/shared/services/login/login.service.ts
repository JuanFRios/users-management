import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = environment.API;

  constructor(
    private http: HttpClient,
  ) { }

  /**
  * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  public login(user: any) {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, user).toPromise();
  }

}
