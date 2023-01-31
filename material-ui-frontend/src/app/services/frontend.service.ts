import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

 /*  userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    id:'',
    username:'',
    email:''
  })
 */
  constructor(private http: HttpClient) { }
  signIn( user:any){
    return this.http.post('http://localhost:3000/api/v1/auth/login', user, { withCredentials:true});
  }

  /* profile(){
    return this.http.get<UserModel>('http://localhost:3000/api/v1/user-profile',{
      withCredentials:true
    });
  }
  saveUserToLocalStorage(user:UserModel){
    this.userProfile.next(user);
    localStorage.setItem('user-profile', JSON.stringify(user));
  } */
}
