import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

}
