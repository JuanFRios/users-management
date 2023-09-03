import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { HomeUserComponent } from './home-user/home-user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [
        CreateUserComponent,
        HomeUserComponent,
        NavBarComponent,
        ListUsersComponent
    ],
    imports: [
        UsersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule
    ],
})
export class UsersModule {
}
