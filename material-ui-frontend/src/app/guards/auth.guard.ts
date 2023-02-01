import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FrontendService } from '../services/frontend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: FrontendService
  ){}
  canActivate():boolean {
    if(!this.authService.isAuth()){
      console.log('Session no longer available as JWT Token expired!');
      return false;
    }
    return true;
  }
  
}

