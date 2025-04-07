import { Injectable } from '@angular/core';
import {Regione} from '../model/regione';

@Injectable({
  providedIn: 'root'
})
export class RegioniService {
  private _regioni: Regione[] = [];

  get regioni(): Regione[] {
    return this._regioni;
  }

  set regioni(value: Regione[]) {
    this._regioni = value;
  }
}
