import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';

const routes: Routes = [
  {
    path:'',
    component: ViewTicketsComponent,
    data:{
      title: 'Tickets'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
