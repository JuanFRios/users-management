import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { UsersService } from '../create-user/shared/services/users/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersMockService } from '../create-user/shared/services/users/users.mock.service';
import { eventInput } from 'hacker-rank/shared/util/event-input';
import { SELECTORS } from 'hacker-rank/shared/util/selectors';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUsersComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [{ provide: UsersService, useClass: UsersMockService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    // Arrange
    // Act
    // Assert
    expect(component).toBeTruthy();
  });

  it('debería cargar la lista de usuarios al inicializar', fakeAsync(async () => {
    // Arrange
    let avatar: HTMLImageElement;
    let email: HTMLElement;
    let firstName: HTMLElement;
    let btnDelete: HTMLButtonElement;
    const index = 0;
    const { data } = await new UsersMockService().getUsers();

    // Act
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    // Assert
    expect(component.users).toEqual(data);
    avatar = SELECTORS.USER.LIST.tableItemAvatar(index);
    email = SELECTORS.USER.LIST.tableItemEmail(index);
    firstName = SELECTORS.USER.LIST.tableItemLastName(index);
    btnDelete = SELECTORS.USER.LIST.tableItemBtnDelete(index);

    expect(avatar.tagName).toEqual('IMG');
    expect(btnDelete.tagName).toEqual('BUTTON');
    expect(email.textContent).toEqual(data[index].email);
    expect(firstName.textContent).toEqual(data[index].first_name);
  }));

  describe('Filtro de usuarios', () => {
    let table: HTMLTableElement;
    let filterInput: HTMLInputElement;

    beforeEach(() => {
      filterInput = SELECTORS.USER.LIST.inputSearch();
    });

    it('debería filtrar los usuarios por nombre correctamente', fakeAsync(async () => {
      // Arrange
      const filter = 'George';

      // Act
      component.ngOnInit();
      eventInput(filterInput, filter);
      tick();
      fixture.detectChanges();
      table = SELECTORS.USER.LIST.table();

      // Assert
      expect(table.querySelector('tbody').children.length).toEqual(1);
    }));

    it('no debería filtrar los usuarios (filtro con menos de 3 caracteres)', fakeAsync(async () => {
      // Arrange
      const filter = 'Ge';
      const { data } = await new UsersMockService().getUsers();

      // Act
      component.ngOnInit();
      eventInput(filterInput, filter);
      tick();
      fixture.detectChanges();
      table = SELECTORS.USER.LIST.table();

      // Assert
      expect(table.querySelector('tbody').childElementCount).toEqual(data.length);
    }));

    it('no debería encontrar coincidencias', fakeAsync(async () => {
      // Arrange
      const filter = 'Juan Rios';

      // Act
      component.ngOnInit();
      eventInput(filterInput, filter);
      tick();
      fixture.detectChanges();
      table = SELECTORS.USER.LIST.table();

      // Assert
      expect(table.querySelector('tbody').childElementCount).toEqual(0);
    }));
  });

  describe('Eliminar usuario', () => {
    it('Debería eliminar el primer usuario', fakeAsync(async () => {
      // Arrange
      let btnDelete: HTMLButtonElement;
      let table: HTMLTableElement;
      const index = 0;
      const { data } = await new UsersMockService().getUsers();

      // Act
      component.ngOnInit();
      tick();
      fixture.detectChanges();
      btnDelete = SELECTORS.USER.LIST.tableItemBtnDelete(index);
      btnDelete.click();
      tick();
      fixture.detectChanges();
      table = SELECTORS.USER.LIST.table();

      // Assert
      expect(table.querySelector('tbody').childElementCount).toEqual(data.length - 1);

      const closeConfirmationMessage: HTMLButtonElement = document.querySelector(`#confirmation-message__close-button`);
      closeConfirmationMessage.click();
      tick();
      fixture.detectChanges();
      const confirmationMessage: HTMLDivElement = document.querySelector(`#confirmation-message`);
      expect(confirmationMessage).toBeNull();
    }));
  });
});
