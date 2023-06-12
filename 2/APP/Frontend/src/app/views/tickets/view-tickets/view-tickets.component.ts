import { Component, OnInit } from '@angular/core';
import {TicketFiltersDto} from 'src/app/models/tickets/ticket_filters.model'
import { ConfigService } from 'src/app/services/config/config.service';
import {TicketService} from 'src/app/services/tickets/ticket.service'
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.scss']
})
export class ViewTicketsComponent implements OnInit {

  public filters:TicketFiltersDto = new TicketFiltersDto('','',null,null,'',-1,'','',-1,-1);

  //Insumos
  public ticketStatus: Array<any> = [];
  public users: Array<any> = [];

  public isWithDates: boolean = false;

  public withAssign = [
     {
      text : 'Si',
      value: 1
    },
    {
      text : 'No',
      value: 0
    }
];

  //data
  public tickets: Array<any> = [];

  //Validaciones
  public isVisible:boolean = true;
  public isWaiting:boolean = false;
  public isDeleting: boolean = false;

  //Paginacion
  public pageCount: number = -1;
  public pages:Array<number> = [];

  //Errores
  public hasError:boolean = false;
  public errorMessage:string = "";
  public deleteMessage:string = "";


  constructor(private _ticketService: TicketService, private _userService: UserService, private _configService: ConfigService) {}

  ngOnInit(): void {
    this.setFilters();
    this.getTicketStatus();
    this.getUsers();
    this.getData();
  }

  private setFilters(){
    this.filters = new TicketFiltersDto('','',null,null,'',-1,'','',-1,-1);
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
    this.filters.pageSize = this._configService.getPagination().pageSize;
  }

  getData(){
    this.isWaiting = true;
    this._ticketService.getTickets(this.filters).subscribe(
      response =>{
        this.isWaiting = false;
        this.tickets = response.data;
        this.pageCount = response.pagination.pageCount;
        this.pages = Array(this.pageCount).fill(1).map((x,i)=>i);
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    )
  }

  OnSubmit(){
    this.getData();
  }

  OnRefresh(){
    this.setFilters();
    this.getTicketStatus();
    this.getData();
  }


  refreshData(event:boolean){
    if(event){
      this.getData();
    }
  }

  //
  changeTicketAssigned(event:any){
    if (event.value) {
      this.isWithDates = event.value == 1 ? true : false;
    }
    else{
      this.isWithDates = false;
    }
  }

  //Paginacion

  OnPageChanges(pageNumber:number){
    this.filters.pageNumber = pageNumber;
    this.getData();
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
