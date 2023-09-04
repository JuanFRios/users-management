import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    fixture.detectChanges();
  });

  it('should call logout method and navigate to /login', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const localStorageSpy = spyOn(localStorage, 'removeItem');

    component.logout();

    expect(navigateSpy).toHaveBeenCalledWith('/login');
    expect(localStorageSpy).toHaveBeenCalledWith('token');
  });

});
