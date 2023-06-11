import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PaginationModule,
  ProgressModule,
  SpinnerModule,
  TableModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';

import { ConfirmViewComponent } from './confirm-view/confirm-view.component';
import { WaitingComponent } from './waiting/waiting.component';
import { ErrorViewComponent } from './error-view/error-view.component';

@NgModule({
  declarations: [ConfirmViewComponent, WaitingComponent, ErrorViewComponent],
  imports: [
    CommonModule,
    AlertModule,
    IconModule,
    ModalModule,
    ButtonModule,
    CardModule,
    ProgressModule,
    FormsModule,
    FormModule,
    TableModule,
    PaginationModule,
    GridModule,
    SpinnerModule,
  ],
  exports: [ConfirmViewComponent,WaitingComponent, ErrorViewComponent],
})
export class CommonsModule {}
