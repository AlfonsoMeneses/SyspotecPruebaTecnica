import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent {

  @Input() isCenterTemplate:boolean = false;

    public styleTyle: string ='text-align: center; padding-top: calc(60vh / 2); height: 60vh';

    ngOnInit(): void {
      if (this.isCenterTemplate) {
        this.styleTyle ='text-align: center;';
      }
    }
}
