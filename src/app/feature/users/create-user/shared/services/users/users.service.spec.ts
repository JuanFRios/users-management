import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from '@environments/environment';
import { IcreateUserRequest } from '@feature/users/models/user.model';
import { apiUsersResponseMock } from '@feature/users/models/user.mock';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.API;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('debería ser creado', () => {
    // Act y Assert
    expect(service).toBeTruthy();
  });

  it('debería obtener una lista de usuarios', () => {
    // Act
    service.getUsers().then((response) => {
      // Assert
      expect(response).toEqual(apiUsersResponseMock);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/users`);

    // Assert
    expect(req.request.method).toBe('GET');

    req.flush(apiUsersResponseMock);
  });

  it('debería crear un nuevo usuario', () => {
    // Arrange
    const newUser: IcreateUserRequest = {
      name: 'Juan Rios',
      job: 'Developer',
    };

    // Act
    service.createUser(newUser)

    const req = httpTestingController.expectOne(`${apiUrl}/users`);

    // Assert
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);

    req.flush({});
  });

  it('debería eliminar un usuario por índice', () => {
    // Arrange
    const index = 1;

    // Act
    service.deleteUserForIndex(index)

    const req = httpTestingController.expectOne(`${apiUrl}/users/${index}`);

    // Assert
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

