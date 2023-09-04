import { usersMock } from '@feature/users/models/user.mock';
import { FilterUserByNamePipe } from './filter-user-by-name.pipe';

describe('FilterUserByNamePipe', () => {
  let pipe: FilterUserByNamePipe;

  beforeEach(() => {
    // Arrange
    pipe = new FilterUserByNamePipe();
  });

  it('debería crear una instancia del filtro', () => {
    // Act
    // Assert
    expect(pipe).toBeTruthy();
  });

  it('debería devolver el arreglo original cuando no se proporciona un filtro', () => {
    // Act
    const result = pipe.transform(usersMock, '');

    // Assert
    expect(result).toEqual(usersMock);
  });

  it('debería devolver el arreglo original cuando el filtro tiene menos de 3 caracteres', () => {
    // Act
    const result = pipe.transform(usersMock, 'a');

    // Assert
    expect(result).toEqual(usersMock);
  });

  it('debería filtrar el arreglo por first_name cuando se proporciona un filtro válido', () => {
    // Act
    const result = pipe.transform(usersMock, 'geo');

    // Assert
    expect(result).toEqual([usersMock[0]]);
  });

  it('debería manejar el filtro con letras en mayúscula y minúscula', () => {
    // Act
    const result = pipe.transform(usersMock, 'GEO');

    // Assert
    expect(result).toEqual([usersMock[0]]);
  });
});
