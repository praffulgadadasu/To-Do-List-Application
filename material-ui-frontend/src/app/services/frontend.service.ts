import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class FrontendService {


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService
  ) { }
  logInUser(user: any) {
    return this.http.post('http://localhost:3000/api/v1/auth/login', user);
  }
  Userprofile() {
    return this.http.get('http://localhost:3000/api/v1/auth/user');
  }
  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }
  putList(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/api/v1/auth/todolist/'+id, data)
  }
  delList(id: number){
    return this.http.delete<any>('http://localhost:3000/api/v1/auth/todolist/'+id);
  }
  logout() {
    //this.cookieService.delete('jwt');
    localStorage.clear();
    return this.http.get('http://localhost:3000/api/v1/auth/logout');
  }
}
