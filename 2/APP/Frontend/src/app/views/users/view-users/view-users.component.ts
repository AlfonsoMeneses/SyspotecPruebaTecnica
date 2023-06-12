import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {

  public isWaiting: boolean = false;

  //Data
  public users: Array<any> = [];

  //errors
  public errorMessage: string = '';
  public hasError: boolean = false;

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
