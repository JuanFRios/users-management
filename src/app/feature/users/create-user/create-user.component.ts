import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MENSAJES_VALIDACION } from './utils';
import { UsersService } from './shared/services/users/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  mensajesValidacion = MENSAJES_VALIDACION;
  createUserForm: FormGroup;
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
  }
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
    // Marcar todos los controles como "touched" para que se disparen los errores de validación
    // De esta forma se muestran los mensajes de error al inicio como lo pide la prueba
    Object.keys(this.createUserForm.controls).forEach(key => {
      const control = this.createUserForm.get(key);
      control.markAsTouched();
    });
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

  onSubmit(): void {
    this.usersService.createUser(this.createUserForm.value).then((res) => {
      this.redirectToListUsers();
    })
  }
}
