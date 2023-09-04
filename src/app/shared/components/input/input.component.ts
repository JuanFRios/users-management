import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements  OnInit{
  @Input() mensajesValidacion;
  @Input() controlName: string;
  @Input() parentForm: FormGroup;
  @Input() label: string;
  @Input() idInput: string;

  ngOnInit(): void {
  }

  get control() {
    return this.parentForm.get(this.controlName);
  }
}
