import { browser, by, element } from 'protractor';

describe('LoginComponent', () => {
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

  it('debería mostrar un mensaje de error si se envía el formulario vacío', () => {
    const loginButton = element(by.id('login__btn-login'));

    loginButton.click(); // Intentar enviar el formulario vacío

    const errorMessage = element(by.css('.error-message')); // Ajusta el selector según tu implementación real
    expect(errorMessage.isPresent()).toBeTruthy();
  });

  it('debería redirigir al usuario a la página de inicio después de un inicio de sesión exitoso', () => {
    const emailInput = element(by.id('login__email'));
    const passwordInput = element(by.id('login__password'));
    const loginButton = element(by.id('login__btn-login'));

    // Ingresa un correo electrónico y contraseña válidos
    emailInput.sendKeys('correo@example.com');
    passwordInput.sendKeys('contraseña123');
    loginButton.click();

    // Verifica que se haya redirigido a la página de inicio
    browser.getCurrentUrl().then((url) => {
      expect(url.endsWith('/users/list')).toBeTruthy(); // Ajusta la URL según tu implementación real
    });
  });
});
