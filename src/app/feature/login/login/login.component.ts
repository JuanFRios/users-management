import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@feature/login/shared/services/login/login.service'
import { MENSAJES_VALIDACION } from './utils';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  mensajesValidacion = MENSAJES_VALIDACION;
  public loginForm: FormGroup;

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private storageService: StorageService
  ) {
    
  }
  
  ngOnInit(): void {
      this.buildForm();
      if (this.storageService.getItem('token')) {
        this.redirectUsers();
      }
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

  public onSubmit(): void {
    this.loginService.login(this.loginForm.value).then((res) => {
      this.storageService.setItem('token', res.token);
      this.redirectUsers();
    })
  }

}
