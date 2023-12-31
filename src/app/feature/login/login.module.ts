import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        LoginRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule
    ],
})
export class LoginModule {
}
