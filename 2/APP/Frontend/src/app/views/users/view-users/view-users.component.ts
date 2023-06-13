import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/users/user.model';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {

  //Validaciones
  public isWaiting: boolean = false;
  public isDeleting: boolean = false;

  //Data
  public users: Array<any> = [];

  private selectedUser: any = null;

  //errors
  public errorMessage: string = '';
  public hasError: boolean = false;

  //
  public deleteMessageTemplate: string = 'Se eliminara el usuario {name} ¿Esta seguro?';
  public deleteMessage:string = "";

  constructor(private _userService: UserService){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.isWaiting = true;
    this._userService.getUsers().subscribe(
      response => {
        this.users = response;
        this.isWaiting = false;
      },
      error =>{
        this.isWaiting = false;
        this.OnError(error);
      }
    );
  }

  updateData(event:boolean){
    if(event){
      this.getData();
    }
  }

  //Delete
  confirmDeleteUser(selectedUser:any){
    this.isDeleting=true;
    this.selectedUser = selectedUser;

    this.deleteMessage = this.deleteMessageTemplate.replace('{name}',selectedUser.nombre);
  }

  deleteMethod(event:any){
    this.isDeleting=false;

    if (event) {
      this.isWaiting = true;
      this._userService.delete(this.selectedUser.id).subscribe(
        response =>{
          this.isWaiting = false;
          this.getData();
        },
        error => {
          this.isWaiting = false;
          this.OnError(error);
        }
      )
    }

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

  closeError(close: boolean) {
    this.hasError = false;
  }
}
