import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { SELECTORS } from 'hacker-rank/shared/util/selectors';
import { eventInput } from 'hacker-rank/shared/util/event-input';
import { UsersService } from './shared/services/users/users.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { UsersMockService } from './shared/services/users/users.mock.service';

describe('CreateUserComponent', () => {
  // Arrange
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

  it('debería validar la existencia de los elementos por su ID', () => {
    // Arrange
    const inputName = SELECTORS.USER.CREATE.inputName();
    const inputJob = SELECTORS.USER.CREATE.inputJob();
    const btnCreate = SELECTORS.USER.CREATE.btnCreate();

    // Act & Assert
    fixture.detectChanges();
    expect(inputName?.tagName).toEqual('INPUT');
    expect(inputJob?.tagName).toEqual('INPUT');
    expect(btnCreate?.tagName).toEqual('BUTTON');
  });

  it('debería mostrar mensajes de error y deshabilitar el botón al estar campos vacíos', () => {
    // Arrange
    let inputNameError: HTMLDivElement;
    let inputJobError: HTMLDivElement;
    let btn: HTMLButtonElement;
    const spyRedirection = spyOn(component, 'redirectToListUsers');

    // Act
    component.ngOnInit();
    fixture.detectChanges();
    inputNameError = SELECTORS.USER.CREATE.inputNameError();
    inputJobError = SELECTORS.USER.CREATE.inputJobError();
    btn = SELECTORS.USER.CREATE.btnCreate();

    // Assert
    expect(btn.disabled).toBeTrue();
    expect(inputNameError.textContent).toContain('Name is required');
    expect(inputJobError.textContent).toContain('Job is required');
    expect(spyRedirection).not.toHaveBeenCalled();
  });

  it('debería habilitar el botón y redirigir al estar todos los campos llenos', fakeAsync(() => {
    // Arrange
    const name = 'Majo';
    const job = 'Ingeniero de Sistemas';
    const spyRedirection = spyOn(component, 'redirectToListUsers');
    let inputNameError: HTMLDivElement;
    let inputJobError: HTMLDivElement;
    let btn: HTMLButtonElement;

    // Act
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

    // Assert
    expect(btn.disabled).toBeFalse();
    expect(inputNameError).toBeNull();
    expect(inputJobError).toBeNull();
    expect(spyRedirection).toHaveBeenCalled();
  }));
});

