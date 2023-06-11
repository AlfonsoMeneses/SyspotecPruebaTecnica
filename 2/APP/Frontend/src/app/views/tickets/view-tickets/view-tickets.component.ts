import { Component, OnInit } from '@angular/core';
import {TicketFiltersDto} from 'src/app/models/tickets/ticket_filters.model'
import {TicketService} from 'src/app/services/tickets/ticket.service'
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss']
})
export class ViewTicketsComponent implements OnInit {

  public filters:TicketFiltersDto = new TicketFiltersDto('','',null,-1,'',-1,'','',-1,-1);

  //Insumos
  public ticketStatus: Array<any> = [];
  public users: Array<any> = [];

  //data
  public tickets: Array<any> = [];

  //Validaciones
  public isVisible:boolean = true;
  public isWaiting:boolean = false;
  public isDeleting: boolean = false;

  //Errores
  public hasError:boolean = false;
  public errorMessage:string = "";
  public deleteMessage:string = "";


  constructor(private _ticketService: TicketService, private _userService: UserService) {}

  ngOnInit(): void {
    this.setFilters();
    this.getTicketStatus();
    this.getUsers();
    this.getData();
  }

  private setFilters(){
    this.setDateFilter();
    this.setPaginationFilter();
  }

  private getTicketStatus(){
    this.isWaiting = true;
    this._ticketService.getAllTicketStatus().subscribe(
      response =>{
        this.ticketStatus = response;
        this.isWaiting = false;
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    )
  }

  private getUsers(){
    this.isWaiting = true;
    this._userService.getUsers().subscribe(
      response =>{
        this.users = response;
        this.isWaiting = false;
        console.log(this.users);
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    )
  }

  private setDateFilter(){
    let actualDate = new Date();
    let actualMonth:string = (actualDate.getMonth() +1).toString();

    if (actualMonth.length < 2) {
      actualMonth = "0"+actualMonth;
    }

    this.filters.from = actualDate.getFullYear() +"-"+actualMonth + "-01";

    actualDate = new Date(actualDate.getFullYear(),actualDate.getMonth()+1,1);

    actualDate = new Date(actualDate.getFullYear(),actualDate.getMonth(),actualDate.getDate()-1);

    this.filters.to = actualDate.getFullYear() + "-" + actualMonth + "-"+ actualDate.getDate();

  }

  private setPaginationFilter(){
    this.filters.pageNumber = 1;
    this.filters.pageSize = 10;
  }

  getData(){
    this.isWaiting = true;
    this._ticketService.getTickets(this.filters).subscribe(
      response =>{
        this.isWaiting = false;
        this.tickets = response.data;
        console.log(this.tickets);
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    )
  }

  OnSubmit(){

  }

  OnRefresh(){

  }

  deleteMethod(event:any){

  }

  refreshData(event:boolean){
    if(event){
      this.getData();
    }
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
