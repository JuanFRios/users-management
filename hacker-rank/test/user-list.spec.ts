import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SELECTORS } from '../shared/util/selectors';
import { ListUsersComponent } from '@feature/users/list-users/list-users.component';
import { UsersService } from '@feature/users/create-user/shared/services/users/users.service';
import { UsersMockService } from './data/users-mock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@shared/shared.module';
import { eventInput } from '../shared/util/event-input';

describe('List users', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListUsersComponent,
      ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(ListUsersComponent);
    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validar existencias de los elementos por el ID', () => {

    const inputSearch = SELECTORS.USER.LIST.inputSearch();
    const table = SELECTORS.USER.LIST.table();

    fixture.detectChanges();

    expect(inputSearch?.tagName).toEqual('INPUT');
    expect(table?.tagName).toEqual('TABLE');
  });

  it('Obtiene la lista de usuarios al inicializar el componente', fakeAsync(async () => {

    let avatar: HTMLImageElement;
    let email: HTMLElement;
    let firstName: HTMLElement;
    let btnDelete: HTMLButtonElement;
    const index = 0;
    const { data } = await new UsersMockService().getUsers();
    component.ngOnInit();
    tick(1000);


    fixture.detectChanges();
    avatar = SELECTORS.USER.LIST.tableItemAvatar(index);
    email = SELECTORS.USER.LIST.tableItemEmail(index);
    firstName = SELECTORS.USER.LIST.tableItemLastName(index);
    btnDelete = SELECTORS.USER.LIST.tableItemBtnDelete(index);


    expect(avatar.tagName).toEqual('IMG');
    expect(btnDelete.tagName).toEqual('BUTTON');
    expect(email.textContent).toEqual(data[index].email);
    expect(firstName.textContent).toEqual(data[index].first_name);
  }));

  it('Elimina un usuario de la lista', fakeAsync(() => {

    let btnDelete: HTMLButtonElement;
    const index = 0;
    const spyDeleteUser = spyOn(usersService, 'deleteUserForIndex').and.callThrough();

    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();
    btnDelete = SELECTORS.USER.LIST.tableItemBtnDelete(index);
    btnDelete.click();

    expect(spyDeleteUser).toHaveBeenCalled();
  }));

  it('Filtra los el usuario por el nombre (filtra correctamente)', fakeAsync(() => {

    let table: HTMLTableElement;
    const name = 'George';

    component.ngOnInit();
    eventInput(SELECTORS.USER.LIST.inputSearch(), name);
    tick(1000);
    fixture.detectChanges();
    table = SELECTORS.USER.LIST.table();

    expect(table.querySelector('tbody').childElementCount).toEqual(1);
  }));

  it('Filtra los el usuario por el nombre (no debe filtrar porque tiene menos de 3 caracteres)', fakeAsync(async () => {

    let table: HTMLTableElement;
    const name = 'Ge';
    const { data } = await new UsersMockService().getUsers();

    component.ngOnInit();
    eventInput(SELECTORS.USER.LIST.inputSearch(), name);
    tick(1000);
    fixture.detectChanges();
    table = SELECTORS.USER.LIST.table();

    expect(table.querySelector('tbody').childElementCount).toEqual(data.length);
  }));

  it('Filtra los el usuario por el nombre (no debe encontrar coincidencias)', fakeAsync(() => {
    let table: HTMLTableElement;
    const name = 'Sebastian';

    component.ngOnInit();
    eventInput(SELECTORS.USER.LIST.inputSearch(), name);
    tick(1000);
    fixture.detectChanges();
    table = SELECTORS.USER.LIST.table();

    expect(table.querySelector('tbody').childElementCount).toEqual(0);
  }));
});

