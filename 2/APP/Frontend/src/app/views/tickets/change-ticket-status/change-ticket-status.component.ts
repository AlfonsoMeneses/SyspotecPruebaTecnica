import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-change-ticket-status',
  templateUrl: './change-ticket-status.component.html',
  styleUrls: ['./change-ticket-status.component.scss'],
})
export class ChangeTicketStatusComponent {
  @Input() public ticketStatus: Array<any> = [];
  @Input() actualStatusId: number = 0;

  @Output() newStatusEmitter = new EventEmitter<number>();

  public statusId: number = -1;

  constructor() {}

  ngOnInit(): void {
    console.log(this.actualStatusId);
    this.statusId = this.actualStatusId;
    console.log(this.statusId);
  }

  //Template
  public title: string = 'Cambiar Estado Del Ticket';

  //Validaciones
  public isVisible: boolean = false;

  //Errores
  hasError: boolean = false;
  errorMessage: string = '';

  OnSubmit() {
    if (this.statusId != this.actualStatusId) {
      this.newStatusEmitter.emit(this.statusId);
      this.statusId = this.actualStatusId;
    } else {
      this.close();
    }
  }

  //Manejo Errores
  OnError(exception: any) {
    let status = exception.status;
    switch (status) {
      case 400:
        this.errorMessage = exception.error.error;
        break;

      default:
        this.errorMessage = 'Error interno , intente en otro momento';
        break;
    }

    this.hasError = true;
  }

  close() {
    this.isVisible = false;
    this.statusId = this.actualStatusId;
  }
}
