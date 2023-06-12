import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { UserService } from 'src/app/services/users/user.service';
import { ConfigService } from 'src/app/services/config/config.service';

import {CommonsModule} from 'src/app/views/commons/commons.module';
import { TicketComponent } from './ticket/ticket.component'
import { AlertModule, AvatarModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, PaginationModule, ProgressModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { ChangeTicketStatusComponent } from './change-ticket-status/change-ticket-status.component';
import { CreateOrEditTicketComponent } from './create-or-edit-ticket/create-or-edit-ticket.component';
import { AssignUserToTicketComponent } from './assign-user-to-ticket/assign-user-to-ticket.component';

@NgModule({
  declarations: [
    ViewTicketsComponent,
    TicketComponent,
    ChangeTicketStatusComponent,
    CreateOrEditTicketComponent,
    AssignUserToTicketComponent
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
    UserService,
    ConfigService
  ]
})
export class TicketsModule { }
