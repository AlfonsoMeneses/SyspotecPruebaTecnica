import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDto } from 'src/app/models/users/user.model';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-create-or-edit-user',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.scss']
})
export class CreateOrEditUserComponent implements OnInit {

  @Input() userToEdit: any;

  @Output() createOrEditEmmite = new EventEmitter<boolean>();

   //Data
   public user:UserDto = new UserDto(-1,'','');

  //Template
  public title: string = 'Nuevo Usuario';
  public buttonTemplate: string = 'btn btn-primary';
  public buttonTitle:string = "Nuevo Usuario";

  //Validaciones
  isVisible:boolean =false;
  isWaiting:boolean = false;

  //Errores
  hasError:boolean = false;
  errorMessage:string = '';

  constructor(private _userService: UserService){}

  ngOnInit(): void {

  }

  setData() {

    if (this.userToEdit) {
      this.setTemplateInfo();
      this.user.id = this.userToEdit.id;
      this.user.name = this.userToEdit.name;
      this.user.document = this.userToEdit.document;;
    }
    else{
      this.user.id = -1;
      this.user.name = this.user.document = '';
    }

  }


  setTemplateInfo() {
    this.buttonTemplate = 'btn btn-success';
    this.buttonTitle = 'Editar';
    this.title = 'Editar Ticket';
  }

  OnShow() {
    this.setData();
    this.isVisible = true;
  }

   //
   OnSubmit() {
    this.userToEdit ? this.OnEdit() : this.OnCreate();
  }

  //Create
  OnCreate() {
    this.isWaiting = true;
    this._userService.create(this.user).subscribe(
      response =>{
        this.isWaiting = false;
        this.isVisible = false;
        this.createOrEditEmmite.emit(true);
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    )

  }

  //Editar
  OnEdit() {
    //this.isWaiting = true;
    alert("Editar proximamente");

  }

  //Manejo Errores
  OnError(exception: any) {
    let status = exception.status;
    switch (status) {
      case 400:
        this.errorMessage = exception.error.error;
        break;
      default:
        this.errorMessage = 'Error interno , intente en otro momento';
        break;
    }

    this.hasError = true;
  }

  //Cerrar el modal
  close() {
    this.isVisible = false;
  }
}
