import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from '@feature/login/login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@feature/login/login/login.component';
import { SELECTORS } from '../shared/util/selectors';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { TokenGuard } from '@core/guard/token/token.guard';
import { eventInput } from '../shared/util/event-input';
import { LoginService } from '@feature/login/shared/services/login/login.service';
import { LoginMockService } from './data/login-mock.service';

describe('Login Page', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let redirectPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        CommonModule,
        LoginRoutingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
      ],
      providers: [
        {
          provide: LoginService, useClass: LoginMockService,
        },
        TokenGuard,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    redirectPage = spyOn(component, 'redirectUsers');
    localStorage.clear();
    fixture.detectChanges();
  });

  it('Validar existencias de los elementos por el ID', () => {
    const inputEmail = SELECTORS.LOGIN.inputEmail();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const inputBtnLogin = SELECTORS.LOGIN.btnLogin();


    fixture.detectChanges();


    expect(inputEmail?.tagName).toEqual('INPUT');
    expect(inputPassword?.tagName).toEqual('INPUT');
    expect(inputBtnLogin?.tagName).toEqual('BUTTON');
  });

  it('Inicia sesión, debe almacenar el token en localStorage y redirige la pagina', fakeAsync(async () => {
    const inputEmail = SELECTORS.LOGIN.inputEmail();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();
    const email = 'eve.holt@reqres.in';
    const password = 'cityslicka';
    const spyLogin = spyOn(loginService, 'login').and.callThrough();
    const { token } = await new LoginMockService().login(null);


    eventInput(inputEmail, email);
    eventInput(inputPassword, password);
    btnLogin.click();
    fixture.detectChanges();
    tick(1000);


    expect(spyLogin).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toEqual(token);
    expect(redirectPage).toHaveBeenCalled();
  }));

  it('Inicia sesión, debe aparecer el error "The minimum of characters will be 8"', () => {
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();
    const password = '123';
    let passwordError: HTMLDivElement;


    eventInput(inputPassword, password);
    btnLogin.click();
    fixture.detectChanges();
    passwordError = SELECTORS.LOGIN.inputPasswordError();


    expect(passwordError.textContent).toContain('The minimum of characters will be 8');
    expect(localStorage.getItem('token')).toBeNull();
    expect(redirectPage).not.toHaveBeenCalled();
  });

  it('Inicia sesión, debe aparecer el error por correo y clave vacío', () => {
    const inputEmail = SELECTORS.LOGIN.inputEmail();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();
    const email = null;
    const password = null;
    let passwordError: HTMLDivElement;
    let emailError: HTMLSpanElement;
    eventInput(inputEmail, email);
    eventInput(inputPassword, password);

    btnLogin.click();
    fixture.detectChanges();
    passwordError = SELECTORS.LOGIN.inputPasswordError();
    emailError = SELECTORS.LOGIN.inputEmailError();

    expect(emailError.textContent).toContain('Email is required');
    expect(passwordError.textContent).toContain('Password is required');
    expect(localStorage.getItem('token')).toBeNull();
    expect(redirectPage).not.toHaveBeenCalled();
  });

  it('El token ya esta almacenado y debe redirigir al la pagina principal',fakeAsync( async () => {
    const { token } = await new LoginMockService().login(null);
    localStorage.setItem('token', token);

    component.ngOnInit();
    fixture.detectChanges();

    expect(localStorage.getItem('token')).toEqual(token);
    expect(redirectPage).toHaveBeenCalled();
  }));

});
