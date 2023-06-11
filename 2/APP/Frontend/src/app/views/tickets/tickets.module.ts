import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { UserService } from 'src/app/services/users/user.service';

import {CommonsModule} from 'src/app/views/commons/commons.module';
import { TicketComponent } from './ticket/ticket.component'
import { AlertModule, AvatarModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, PaginationModule, ProgressModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { ChangeTicketStatusComponent } from './change-ticket-status/change-ticket-status.component';
import { CreateOrEditTicketComponent } from './create-or-edit-ticket/create-or-edit-ticket.component';

@NgModule({
  declarations: [
    ViewTicketsComponent,
    TicketComponent,
    ChangeTicketStatusComponent,
    CreateOrEditTicketComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    CommonsModule,
    TableModule,
    PaginationModule,
    CardModule,
    ButtonModule,
    GridModule,
    FormModule,
    FormsModule,
    AlertModule,
    SpinnerModule,
    IconModule,
    AvatarModule,
    ModalModule,
    ProgressModule
  ],
  providers:[
    TicketService,
    UserService
  ]
})
export class TicketsModule { }
