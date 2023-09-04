import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  // Arrange
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('debería crearse', () => {
    // Act y Assert
    expect(service).toBeTruthy();
  });

  it('debería establecer y obtener un elemento del almacenamiento local', () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    service.setItem(key, value);
    const retrievedValue = service.getItem(key);

    // Assert
    expect(retrievedValue).toEqual(value);
  });

  it('debería devolver undefined para un elemento que no existe', () => {
    // Arrange
    const key = 'nonExistentKey';

    // Act
    const retrievedValue = service.getItem(key);

    // Assert
    expect(retrievedValue).toBeUndefined();
  });

  it('debería limpiar el almacenamiento local', () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    service.setItem(key, value);
    service.clear();

    // Assert
    expect(service.getItem(key)).toBeUndefined();
  });

  it('debería eliminar un elemento del almacenamiento local', () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    service.setItem(key, value);
    service.removeItem(key);

    // Assert
    expect(service.getItem(key)).toBeUndefined();
  });

  it('debería intentar eliminar un elemento del almacenamiento local que no existe', () => {
    // Arrange
    const key = 'testKey';

    // Act
    service.removeItem(key);

    // Assert
    expect(service.getItem(key)).toBeUndefined();
  });

  it('debería devolver true para un elemento existente', () => {
    // Arrange
    const key = 'testKey';
    const value = 'testValue';

    // Act
    service.setItem(key, value);

    // Assert
    expect(service.existsItem(key)).toBeTrue();
  });

  it('debería devolver false para un elemento que no existe', () => {
    // Arrange
    const key = 'nonExistentKey';

    // Assert
    expect(service.existsItem(key)).toBeFalse();
  });
});
