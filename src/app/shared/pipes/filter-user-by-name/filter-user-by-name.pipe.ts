import { Pipe, PipeTransform } from '@angular/core';
import { IuserResponse } from '@feature/users/models/user.model';

@Pipe({
  name: 'filterUserByName',
})
export class FilterUserByNamePipe implements PipeTransform {

  transform(users: IuserResponse[], filter: string): IuserResponse[] {
    if (!filter) {
      return users; // No se aplica ningún filtro, devuelve la lista completa.
    }

    // Si el filtro tiene menos de 3 caracteres, no se aplica ningún filtro, devuelve la lista completa.
    if (filter.length < 3) {
      return users;
    }

    filter = filter.toLowerCase(); // Convierte el filtro a minúsculas para hacer una comparación sin distinción entre mayúsculas y minúsculas.

    return users.filter(user => user.first_name.toLowerCase().includes(filter));
  }

}
