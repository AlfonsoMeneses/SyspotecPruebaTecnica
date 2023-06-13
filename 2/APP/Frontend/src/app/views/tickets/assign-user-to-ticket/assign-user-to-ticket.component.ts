import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-assign-user-to-ticket',
  templateUrl: './assign-user-to-ticket.component.html',
  styleUrls: ['./assign-user-to-ticket.component.scss']
})
export class AssignUserToTicketComponent implements OnInit{
  @Input() ticket: any = null;
  @Input() public users: Array<any> = [];

  @Output() assignEmmite = new EventEmitter<boolean>()

  //Template
   public title: string = 'Ticket #{code}';

   //Data
   public userId: number = 0;

   //Validaciones
  public isVisible: boolean = false;
  public isWaiting: boolean = false;

  //Errores
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private _ticketService: TicketService){}

  ngOnInit(): void {
    this.setData();
  }

  setData(){

    if (this.ticket) {
      this.title  =    this.title.replace("{code}",this.ticket.numero);
    }
  }

  OnShow() {
    this.isVisible = true;
    this.userId = 0;
  }

  OnSubmit(){
    this.isWaiting = true;
    this._ticketService.assingUser(this.ticket.id, this.userId).subscribe(
      response =>{
        this.isWaiting = false;
        this.assignEmmite.emit(true);
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    )
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
  }

}
