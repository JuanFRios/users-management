import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from '@environments/environment';
import { IcreateUserRequest, IlistUsersResponse } from '@feature/users/models/user.model';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of users', () => {
    const usersResponse: IlistUsersResponse = {
      data: [
        {
          id: 1,
          first_name: 'Dane',
          last_name: 'Bayer',
          email: '',
          avatar: '',
        }],
      page: 1,
      per_page: 1,
      total: 1,
      total_pages: 1,
    };

    service.getUsers().then((response) => {
      expect(response).toEqual(usersResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/users`);
    expect(req.request.method).toBe('GET');

    req.flush(usersResponse);
  });

  it('should create a new user', () => {
    const newUser: IcreateUserRequest = {
      name: 'Dane Bayer',
      job: 'Developer',
    };

    service.createUser(newUser).then(() => {
      // You can add additional expectations if needed
    });

    const req = httpTestingController.expectOne(`${apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);

    req.flush({});
  });

  it('should delete a user by index', () => {
    const index = 1;

    service.deleteUserForIndex(index).then(() => {
      // You can add additional expectations if needed
    });

    const req = httpTestingController.expectOne(`${apiUrl}/users/${index}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
