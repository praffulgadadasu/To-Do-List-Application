import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

const baseUrl = 'http://localhost:3000/api/v1/auth/register';


@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(baseUrl);
  }
}
