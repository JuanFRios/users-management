export const SELECTORS = {
  LOGIN: {
    inputEmail: (): HTMLInputElement => document.querySelector('#login__email'),
    inputEmailError: (): HTMLSpanElement => document.querySelector('#login__email-error'),
    inputPassword: (): HTMLInputElement => document.querySelector('#login__password'),
    inputPasswordError: (): HTMLDivElement => document.querySelector('#login__password-error'),
    btnLogin: (): HTMLButtonElement => document.querySelector('#login__btn-login'),
  },
  NAV_BAR: {
    linkListUser: (): HTMLLinkElement => document.querySelector('#nav-bar__btn-list-user'),
    linkCreateUser: (): HTMLLinkElement => document.querySelector('#nav-bar__btn-create-user'),
    linkLogOut: (): HTMLLinkElement => document.querySelector('#nav-bar__btn-logout'),
  },
  USER: {
    LIST: {
      inputSearch: (): HTMLInputElement => document.querySelector('#user-list__filter'),
      table: (): HTMLTableElement => document.querySelector('#user-list__table'),
      tableItem: (index: number): HTMLElement => document.querySelector(`#user-list__table-item-${index}`),
      tableItemAvatar: (index: number): HTMLImageElement => document.querySelector(`#user-list__table-item-${index}-avatar`),
      tableItemLastName: (index: number): HTMLElement => document.querySelector(`#user-list__table-item-${index}-first_name`),
      tableItemEmail: (index: number): HTMLElement => document.querySelector(`#user-list__table-item-${index}-email`),
      tableItemBtnDelete: (index: number): HTMLButtonElement => document.querySelector(`#user-list__table-item-${index}-btn-delete`),
    },
    CREATE: {
      inputName: (): HTMLInputElement => document.querySelector('#user-create__name'),
      inputNameError: (): HTMLDivElement => document.querySelector('#user-create__name-error'),
      inputJob: (): HTMLInputElement => document.querySelector('#user-create__job'),
      inputJobError: (): HTMLDivElement => document.querySelector('#user-create__job-error'),
      btnCreate: (): HTMLButtonElement => document.querySelector('#user-create__btn-create'),
    },
  },
};
