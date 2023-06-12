import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import {UserDto} from 'src/app/models/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   //URLs EndPoints
   private _urlBase: string = environment.services.base;
   private _get: string = environment.services.user.get;
   private _create: string = environment.services.user.create;
   private _edit: string = environment.services.user.edit;
   private _delete: string = environment.services.user.delete;

   constructor(private _http: HttpClient) {}

   public getUsers():Observable<any>{
    let urlService = this._urlBase + this._get;
    return this._http.get(urlService);
   }

   public create(user:UserDto):Observable<any>{
    let urlService = this._urlBase + this._create;

    let bodyReq = {
      nombre: user.name,
      cedula: user.document
    };

    return this._http.post(urlService, bodyReq);
   }

   public edit(userId: number, userToEdit: UserDto):Observable<any>{

    let urlService = this._urlBase + this._edit  + userId;

    let bodyReq = {
      nombre: userToEdit.name,
      cedula: userToEdit.document
    };

    return this._http.put(urlService, bodyReq);
   }

}
