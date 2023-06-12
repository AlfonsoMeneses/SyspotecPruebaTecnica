import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TicketDto } from 'src/app/models/tickets/ticket.modele';
import { TicketToEditDto } from 'src/app/models/tickets/ticket_to_edit.model';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-create-or-edit-ticket',
  templateUrl: './create-or-edit-ticket.component.html',
  styleUrls: ['./create-or-edit-ticket.component.scss'],
})
export class CreateOrEditTicketComponent implements OnInit {
  @Input() ticketToEdit: any = null;
  @Input() public users: Array<any> = [];

  @Output() createOrEditEmmite = new EventEmitter<boolean>();

  //Template
  public buttonTitle: string = 'Nuevo Ticket';
  public title: string = 'Nuevo Ticket';
  public buttonTemplate: string = 'btn btn-outline-primary';

  //Data
  public description: string = '';
  public prioridad: string = '';
  public userId: number = 0;

  //Validaciones
  public isVisible: boolean = false;
  public isWaiting: boolean = false;

  //Errores
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private _ticketService: TicketService) {}

  ngOnInit(): void {
    if (this.ticketToEdit) {
      this.setTemplateInfo();
    }
  }

  setData() {
    this.description = this.ticketToEdit ? this.ticketToEdit.descripcion : '';
    this.prioridad = this.ticketToEdit ? this.ticketToEdit.prioridad : '';
    this.userId =this.ticketToEdit && this.ticketToEdit.asignadosUsuarios ? this.ticketToEdit.asignadosUsuarios.usuario.id : 0;
  }


  setTemplateInfo() {
    this.buttonTemplate = 'btn btn-success';
    this.buttonTitle = 'Editar';
    this.title = 'Editar Ticket';
  }

  OnShow() {
    this.setData();
    this.isVisible = true;
  }

  //
  OnSubmit() {
    this.ticketToEdit ? this.OnEdit() : this.OnCreate();
  }

  //Create
  OnCreate() {
    this.isWaiting = true;
    this._ticketService
      .create(new TicketDto(this.description, this.prioridad))
      .subscribe(
        (response) => {
          this.createOrEditEmmite.emit(true);
          this.isWaiting = false;
        },
        (error) => {
          this.OnError(error);
          this.isWaiting = false;
        }
      );
  }

  //Editar
  OnEdit() {
    this.isWaiting = true;
    this._ticketService
      .edit(this.ticketToEdit.id,new TicketToEditDto(this.description, this.prioridad, this.userId))
      .subscribe(
        (response) => {
          this.createOrEditEmmite.emit(true);
          this.isWaiting = false;
        },
        (error) => {
          this.OnError(error);
          this.isWaiting = false;
        }
      );
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
