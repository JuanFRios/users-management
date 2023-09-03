import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = environment.API;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  /**
  * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
   * */
  public login(user: any): Promise<{token: string}> {
    // se debe hacer la peticion al endpoint de login pero este metodo no debe retornar un observable sino una promesa y guardar el token en el storage
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, user).toPromise();
  }
}
