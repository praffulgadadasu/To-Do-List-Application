import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  constructor(private http: HttpClient) { }
  signIn( user:any){
    return this.http.post('http://localhost:3000/api/v1/auth/login', user);
  }
}
