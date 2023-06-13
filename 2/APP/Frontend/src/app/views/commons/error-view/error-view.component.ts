import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.scss']
})
export class ErrorViewComponent {
  @Input() errorMessage:string = '';
  @Input() isVisible:boolean = false;

  @Output() closeEmit = new EventEmitter<boolean>();

  closeModal(){
    this.closeEmit.emit(true);
  }
}
