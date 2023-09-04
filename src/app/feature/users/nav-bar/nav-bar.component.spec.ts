import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';
import { StorageService } from '@core/services/storage.service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: StorageService }],
    });

    fixture = TestBed.createComponent(NavBarComponent);
    storageService = TestBed.inject(StorageService);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('debería crear el componente', () => {
    // Arrange & Act & Assert
    expect(component).toBeTruthy();
  });

  it('debería inicializar el componente', () => {
    // Arrange & Act
    fixture.detectChanges();
  });

  it('debería llamar al método logout y navegar a /login', () => {
    // Arrange
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const localStorageSpy = spyOn(storageService, 'removeItem');

    // Act
    component.logout();

    // Assert
    expect(navigateSpy).toHaveBeenCalledWith('/login');
    expect(localStorageSpy).toHaveBeenCalledWith('token');
  });
});
