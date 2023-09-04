import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationMessageComponent } from './confirmation-message.component';

describe('ConfirmationMessageComponent', () => {
  let component: ConfirmationMessageComponent;
  let fixture: ComponentFixture<ConfirmationMessageComponent>;
  let onCloseSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationMessageComponent],
    });

    fixture = TestBed.createComponent(ConfirmationMessageComponent);
    component = fixture.componentInstance;
    onCloseSpy = spyOn(component, 'onClose');
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el mensaje de confirmación', () => {
    // Arrange
    const confirmationMessage = 'Mensaje de confirmación';

    // Act
    component.confirmationMessage = confirmationMessage;
    fixture.detectChanges();

    // Assert
    const messageText: HTMLSpanElement = document.querySelector('.confirmation-message__text');
    expect(messageText.textContent).toContain(confirmationMessage);
  });

  it('debería llamar al método onClose al hacer clic en el botón de cierre', () => {
    document.querySelector('.confirmation-message__close-button')
    // Arrange
    const closeButton: HTMLButtonElement = document.querySelector('.confirmation-message__close-button')

    // Act
    closeButton.click();

    // Assert
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
