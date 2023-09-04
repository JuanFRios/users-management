import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterUserByNamePipe } from '@shared/pipes/filter-user-by-name/filter-user-by-name.pipe';
import { InputComponent } from '@shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationMessageComponent } from './components/confirmation-message/confirmation-message.component';


@NgModule({
  declarations: [
    InputComponent,
    FilterUserByNamePipe,
    ConfirmationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    FilterUserByNamePipe,
    ConfirmationMessageComponent
  ]
})
export class SharedModule {
}
