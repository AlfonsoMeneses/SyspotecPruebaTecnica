import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input() public ticket: any;
  @Input() public lstTicketStatus: Array<any> = [];
  @Input() public users: Array<any> = [];

  @Output() changeTicketEvent = new EventEmitter<boolean>();

  public avatarName: string = '';
  public avatarColor: string = 'light';

  public assignUserValidate: boolean = false;

  public statusTemplate: string = 'text-dark';

  private ticketStatus: any;

  public isTicketStatusFinish:boolean = false;

  //Validaciones
  public isVisible:boolean = false;
  public isWaiting:boolean = false;
  public isDeleting: boolean = false;

   //Errores
   public hasError:boolean = false;
   public errorMessage:string = "";
   public deleteMessage:string = "Se eliminara el ticket #{code} ¿Esta seguro?";

  constructor(private _ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketStatus = this._ticketService.getTicketStatus();
    this.setMessages();
    if (this.ticket.asignadosUsuarios) {
      this.avatarName = this.ticket.asignadosUsuarios.usuario.nombre.charAt(0);
      this.avatarColor = 'success';
      this.assignUserValidate = true;
      this.setStatusTemplates();
    }
  }

  setMessages(){
    this.deleteMessage = this.deleteMessage.replace("{code}",this.ticket.numero);
  }

  setStatusTemplates() {

    switch (this.ticket.asignadosUsuarios.estado.nombre) {
      case this.ticketStatus.ON_PROCCESS:
        this.statusTemplate = "text-info"
        break;
      case this.ticketStatus.SUSPENDED:
        this.statusTemplate = "text-warning"
        break;
      case this.ticketStatus.FINISHED:
        this.statusTemplate = "text-success"
        this.isTicketStatusFinish = true;
        break;
      case this.ticketStatus.EXPIRED:
        this.statusTemplate = "text-danger"
        break;

      default:
        this.statusTemplate = "text-dark"
        break;
    }

  }

  //Cambio Estado
  OnChangeTicketStatus(ticketStatusId:number){
    if(ticketStatusId > 0){
      this.isWaiting = true;
      this._ticketService.changeStatus(this.ticket.id,ticketStatusId).subscribe(
        response =>{
          this.isWaiting = false;
          this.changeTicketEvent.emit(true);
        },
        error =>{
          this.isWaiting = false;
          this.OnError(error);
        }
      )
    }
  }

  //
  refreshData(validate:boolean){
    if (validate) {
      this.changeTicketEvent.emit(true);
    }
  }


  //Eliminar Ticket

  confirmDeleteTicket(){
    this.isDeleting = true;
  }

  deleteMethod(event:any){
    this.isDeleting=false;
    if (event) {
      this.OnDeleteTicket();
    }
  }

  OnDeleteTicket(){
    this.isWaiting = true;
    this._ticketService.delete(this.ticket.id).subscribe(
      response =>{
        this.isWaiting = false;
        this.changeTicketEvent.emit(true);
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    )
  }

  //Manejo Errores
  OnError(exception:any){
    let status = exception.status;
    switch (status) {
      case 400:
        this.errorMessage = exception.error.error;
        break;

      default:
        this.errorMessage = "Error interno , intente en otro momento";
        break;
    }

    this.hasError = true;

  }



  closeError(event:any){
    this.hasError = false;
  }
}
