import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '@environments/environment';

describe('LoginService', () => {
  // Arrange
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.API;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('debería ser creado', () => {
    // Act y Assert
    expect(service).toBeTruthy();
  });

  it('debería enviar una solicitud POST al API de inicio de sesión y devolver un token', () => {
    // Arrange
    const user = { username: 'testuser', password: 'testpassword' };
    const tokenResponse = { token: 'testtoken' };

    // Act
    service.login(user).then((response) => {
      // Assert
      expect(response).toEqual(tokenResponse);
    });

    // Act
    const req = httpTestingController.expectOne(`${apiUrl}/login`);

    // Assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);

    req.flush(tokenResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

