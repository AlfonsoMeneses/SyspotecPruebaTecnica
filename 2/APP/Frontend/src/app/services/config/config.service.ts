import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  private _pagination = environment.pagination;

  constructor() { }

  getPagination(){
    return this._pagination;
  }
}
