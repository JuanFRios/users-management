import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  // Arrange: Configurar el entorno de prueba
  let formBuilder: FormBuilder;
  let parentForm: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    parentForm = formBuilder.group({
      exampleControl: ['', Validators.required], 
    });

    component.parentForm = parentForm;
    component.controlName = 'exampleControl';
    component.label = 'Label de prueba';
    component.idInput = 'idInputEjemplo';

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    // Act y Assert
    expect(component).toBeTruthy();
  });

  it('el FormGroup debería configurarse correctamente en el componente', () => {
    // Act y Assert
    expect(component.parentForm).toEqual(parentForm);
  });

  it('debería obtener el control del componente correcto', () => {
    // Act
    const control = component.control;

    // Assert
    expect(control).toEqual(parentForm.get('exampleControl'));
  });


  // Arrange
  afterEach(() => {
    fixture.destroy();
  });
});

