import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RicetteService {
  private numRicetteSource = new BehaviorSubject<number>(0);
  numRicette$ = this.numRicetteSource.asObservable();

  updateNumRicette(count: number) {
    this.numRicetteSource.next(count);
  }
}
