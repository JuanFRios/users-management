import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeUserComponent } from './home-user.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeUserComponent', () => {
  let component: HomeUserComponent;
  let fixture: ComponentFixture<HomeUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeUserComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HomeUserComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el componente', () => {
    fixture.detectChanges();

  });
});
