import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';
import { TokenGuard } from './token.guard';

describe('TokenGuard', () => {
  let guard: TokenGuard;
  let storageService: StorageService;
  let router: Router;

  // Arrange: Configurar el entorno de pruebas
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TokenGuard, StorageService],
    });
    guard = TestBed.inject(TokenGuard);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
  });

  it('debería crearse', () => {
    // Act y Assert
    expect(guard).toBeTruthy();
  });

  it('debería devolver true si existe un token', () => {
    // Act
    spyOn(storageService, 'getItem').and.returnValue('someToken');
    const canActivate = guard.canActivate(null, null);

    // Assert
    expect(canActivate).toBe(true);
  });

  it('debería navegar a /login y devolver false si no existe un token', () => {
    // Act
    spyOn(storageService, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = guard.canActivate(null, null);

    // Assert
    expect(canActivate).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});

