import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { TicketService } from 'src/app/services/tickets/ticket.service';

import {CommonsModule} from 'src/app/views/commons/commons.module';
import { TicketComponent } from './ticket/ticket.component'
import { AlertModule, AvatarModule, ButtonModule, CardModule, FormModule, GridModule, PaginationModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    ViewTicketsComponent,
    TicketComponent
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
    AvatarModule
  ],
  providers:[
    TicketService
  ]
})
export class TicketsModule { }
