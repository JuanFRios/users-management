import { browser, by, element } from 'protractor';

describe('Login', () => {
  beforeEach(() => {
    // Navegar a la página de inicio de sesión antes de cada prueba
    browser.get('/login');
  });

  it('debería mostrar el formulario de inicio de sesión', () => {
    const loginForm = element(by.tagName('form'));
    expect(loginForm.isPresent()).toBeTruthy();
  });

  it('debería permitir ingresar un correo electrónico y contraseña', () => {
    const emailInput = element(by.id('login__email'));
    const passwordInput = element(by.id('login__password'));

    expect(emailInput.isPresent()).toBeTruthy();
    expect(passwordInput.isPresent()).toBeTruthy();
  });

  it('debería redirigir al usuario a la página de inicio después de un inicio de sesión exitoso', () => {
    const emailInput = element(by.id('login__email'));
    const passwordInput = element(by.id('login__password'));
    const loginButton = element(by.id('login__btn-login'));

    // Ingresa un correo electrónico y contraseña válidos
    emailInput.sendKeys('eve.holt@reqres.in');
    passwordInput.sendKeys('cityslicka');
    loginButton.click();

    //esperar a que se haga la peticion
    browser.waitForAngular();

    // Verifica que se haya redirigido a la página de inicio
    browser.getCurrentUrl().then((url) => {
      expect(url.endsWith('/users/list')).toBeTruthy();
    });
  });
});
