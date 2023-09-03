import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get an item from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  it('should return undefined for a non-existent item', () => {
    const key = 'nonExistentKey';

    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toBeUndefined();
  });

  it('should clear local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    service.clear();

    expect(service.getItem(key)).toBeUndefined();
  });

  it('should remove an item from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    service.removeItem(key);

    expect(service.getItem(key)).toBeUndefined();
  });

  it('should try to remove an item from local storage which does not exist', () => {
    const key = 'testKey';
    service.removeItem(key);

    expect(service.getItem(key)).toBeUndefined();
  });

  it('should return true for an existing item', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);

    expect(service.existsItem(key)).toBeTrue();
  });

  it('should return false for a non-existent item', () => {
    const key = 'nonExistentKey';

    expect(service.existsItem(key)).toBeFalse();
  });
});
