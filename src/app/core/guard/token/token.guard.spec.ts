import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';
import { TokenGuard } from './token.guard';
import { StorageService } from '@core/services/storage.service';

describe('TokenGuard', () => {
  let guard: TokenGuard;
  let storageService: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TokenGuard, StorageService],
    });
    guard = TestBed.inject(TokenGuard);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if a token exists', () => {
    spyOn(storageService, 'getItem').and.returnValue('someToken');

    const canActivate = guard.canActivate(null, null);

    expect(canActivate).toBe(true);
  });

  it('should navigate to /login and return false if no token exists', () => {
    spyOn(storageService, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    
    const canActivate = guard.canActivate(null, null);

    expect(canActivate).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
