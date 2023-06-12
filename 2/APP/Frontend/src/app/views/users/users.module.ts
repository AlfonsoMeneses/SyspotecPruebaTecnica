import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';


import {ViewUsersComponent} from './view-users/view-users.component'
import { CommonsModule } from '../commons/commons.module';
import { AlertModule, AvatarModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, PaginationModule, SpinnerModule, TableModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { UserService } from 'src/app/services/users/user.service';


@NgModule({
  declarations: [
    ViewUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
  ],
  providers: [UserService],

})
export class UsersModule { }
