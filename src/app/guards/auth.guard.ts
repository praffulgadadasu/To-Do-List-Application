import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { FrontendService } from '../services/frontend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: FrontendService
  ) { }
  canActivate(): boolean {
    if (!this.authService.isAuth()) {
      return false;
    }
    return true;
  }

}

