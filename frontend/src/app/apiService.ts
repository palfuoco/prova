import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  constructor(public http: HttpClient) {}

  getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  getByAny(url: string, any: any): Observable<T[]> {
    return this.http.get<T[]>(`${url}/${any}`);
  }

  create(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

  update(url: string, any: any, data: T): Observable<T> {
    return this.http.put<T>(`${url}/${any}`, data);
  }

  deleteByAny(url: string, any: any): Observable<void> {
    return this.http.delete<void>(`${url}/${any}`);
  }

  getByValue(url: string, value: any): Observable<T> {
    return this.http.get<T>(`${url}/${value}`);
  }

  getByTwoValues(url: string, val1: any, val2: any): Observable<any> {
    return this.http.get<any>(`${url}/${val1}/${val2}`);
  }


  delete(url: string): Observable<void> {
    return this.http.delete<void>(`${url}`);
  }
}
