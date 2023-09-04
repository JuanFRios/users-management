import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss']
})
export class ConfirmationMessageComponent implements OnInit {
  @Input() public confirmationMessage: string = '';
  @Input() public onClose: () => void = () => {};
  constructor() { }

  ngOnInit(): void {
  }

}
