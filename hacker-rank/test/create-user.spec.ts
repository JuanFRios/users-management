import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SELECTORS } from '../shared/util/selectors';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';
import { UsersMockService } from './data/users-mock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@shared/shared.module';
import { eventInput } from '../shared/util/event-input';
import { CreateUserComponent } from '@feature/users/create-user/create-user.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Create User', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateUserComponent,
      ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [
        {
          provide: UsersService, useClass: UsersMockService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validar existencias de los elementos por el ID', () => {

    const inputName = SELECTORS.USER.CREATE.inputName();
    const inputJob = SELECTORS.USER.CREATE.inputJob();
    const btnCreate = SELECTORS.USER.CREATE.btnCreate();

    fixture.detectChanges();

    expect(inputName?.tagName).toEqual('INPUT');
    expect(inputJob?.tagName).toEqual('INPUT');
    expect(btnCreate?.tagName).toEqual('BUTTON');
  });

  it('Los campos están vacíos y deben aparecer el mensaje de error y deshabilitar para crear usuario', () => {

    let inputNameError: HTMLDivElement;
    let inputJobError: HTMLDivElement;
    let btn: HTMLButtonElement;
    const spyRedirection = spyOn(component, 'redirectToListUsers');

    component.ngOnInit();
    fixture.detectChanges();
    inputNameError = SELECTORS.USER.CREATE.inputNameError();
    inputJobError = SELECTORS.USER.CREATE.inputJobError();
    btn = SELECTORS.USER.CREATE.btnCreate();


    expect(btn.disabled).toBeTrue();
    expect(inputNameError.textContent).toContain('Name is required');
    expect(inputJobError.textContent).toContain('Job is required');
    expect(spyRedirection).not.toHaveBeenCalled();

  });

  it('Todos los campos están llenos, debe habilitar el btn y redireccionar', fakeAsync(() => {

    const name = 'Majo';
    const job = 'Systems Engineer';
    const spyRedirection = spyOn(component, 'redirectToListUsers');
    let inputNameError: HTMLDivElement;
    let inputJobError: HTMLDivElement;
    let btn: HTMLButtonElement;


    component.ngOnInit();
    fixture.detectChanges();
    eventInput(SELECTORS.USER.CREATE.inputName(), name);
    eventInput(SELECTORS.USER.CREATE.inputJob(), job);
    fixture.detectChanges();
    inputNameError = SELECTORS.USER.CREATE.inputNameError();
    inputJobError = SELECTORS.USER.CREATE.inputJobError();
    btn = SELECTORS.USER.CREATE.btnCreate();
    btn.click();
    tick(1000);


    expect(btn.disabled).toBeFalse();
    expect(inputNameError).toBeNull();
    expect(inputJobError).toBeNull();
    expect(spyRedirection).toHaveBeenCalled();
  }));

});

