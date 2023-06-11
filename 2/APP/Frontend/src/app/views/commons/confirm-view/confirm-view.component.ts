import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-view',
  templateUrl: './confirm-view.component.html',
  styleUrls: ['./confirm-view.component.scss']
})
export class ConfirmViewComponent implements OnInit {

  ngOnInit(): void {
      if (this.color == "dark") {
        this.classTemplate = "text-white bg-dark";
      }
      else if(this.color == "info"){
        this.classTemplate = "text-white bg-info";
      }
      else if(this.color == "success"){
        this.classTemplate = "text-white bg-success";
      }
      else if (this.color == "danger") {
        this.classTemplate = "bg-danger";
      }
      else if (this.color == "warning") {
        this.classTemplate = "bg-warning";
      }
      else if (this.color == "light") {
        this.classTemplate = "bg-light";
      }
      else{
        this.classTemplate = "bg-secondary"
      }
  }

  @Input() isVisible:boolean = false;
  @Input() color = "dark";
  @Input() tittle:string = '';
  @Input() message:string = '';

  @Output() isConfirm = new EventEmitter<boolean>();

  classTemplate: string = "bg-info";

  public confirm(isconfirm:boolean){
    this.isConfirm.emit(isconfirm);
  }
}
