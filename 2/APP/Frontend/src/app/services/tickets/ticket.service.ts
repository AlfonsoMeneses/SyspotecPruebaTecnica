import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { TicketFiltersDto } from 'src/app/models/tickets/ticket_filters.model';
import { TicketDto } from 'src/app/models/tickets/ticket.modele';
import { TicketToEditDto } from 'src/app/models/tickets/ticket_to_edit.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  //URLs EndPoints
  private _urlBase: string = environment.services.base;
  private _get: string = environment.services.tickets.get;
  private _create: string = environment.services.tickets.create;
  private _edit: string = environment.services.tickets.edit;
  private _assingUser: string = environment.services.tickets.assingUser;
  private _delete: string = environment.services.tickets.delete;
  private _getStatus: string = environment.services.tickets.getStatus;
  private _changeStatus: string = environment.services.tickets.changeStatus;
  private _paths = environment.services.tickets.paths;
  private _status = environment.status;

  constructor(private _http: HttpClient) {}

  getTicketStatus() {
    return this._status;
  }

  getAllTicketStatus(): Observable<any> {
    let urlService = this._urlBase + this._getStatus;
    return this._http.get(urlService);
  }

  getTickets(filters: TicketFiltersDto): Observable<any> {
    let query =
      '?pageSize=' +
      filters.pageSize +
      '&pageNumber=' +
      filters.pageNumber +
      '&priority=' +
      filters.priority.replaceAll(' ', '%')+
      '&description=' +
      filters.description.replaceAll(' ', '%')+
      '&userName=' +
      filters.userName.replaceAll(' ', '%');

    if (filters.status >0) {
      query += "&status="+filters.status;
    }

    if (filters.number) {
      query += "&number="+filters.number;
    }

    if (filters.isAssigned) {
      query += "&isAssigned="+(filters.isAssigned == 1 ? true : false);
    }

    if (filters.isAssigned && filters.isAssigned == 1) {
      query += "&from="+filters.from +
               "&to="+filters.to;
    }

    let urlService = this._urlBase + this._get + query;

    return this._http.get(urlService);
  }

  create(ticket: TicketDto): Observable<any> {
    let urlService = this._urlBase + this._create;

    let bodyReq = {
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
    };

    return this._http.post(urlService, bodyReq);
  }

  edit(ticketId: number, ticket: TicketToEditDto): Observable<any> {
    let urlService = this._urlBase + this._edit + ticketId;

    let bodyReq = {
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      idUsuario: ticket.idUsuario,
    };

    return this._http.put(urlService, bodyReq);
  }

  assingUser(ticketId: number, userId: number): Observable<any> {
    let urlService = this._urlBase + this._assingUser + ticketId;

    let bodyReq = {
      IdUsuario: userId,
    };

    return this._http.post(urlService, bodyReq);
  }

  changeStatus(ticketId: number, statusId: number): Observable<any> {
    let urlService =
      this._urlBase +
      this._changeStatus
        .replace(this._paths.ticketId, ticketId.toString())
        .replace(this._paths.statusId, statusId.toString());

    return this._http.patch(urlService, null);
  }

  delete(ticketId: number): Observable<any> {
    let urlService = this._urlBase + this._delete + ticketId;

    return this._http.delete(urlService);
  }
}
