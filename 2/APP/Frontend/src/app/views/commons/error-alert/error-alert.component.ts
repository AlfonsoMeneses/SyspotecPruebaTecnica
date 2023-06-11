import { Component, Input } from '@angular/core';
import { cilCheck, cilAlarm, cilBan } from '@coreui/icons';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
})
export class ErrorAlertComponent {
  @Input() errorMessage: string = '';

  public icons = { cilCheck, cilAlarm, cilBan };
}
