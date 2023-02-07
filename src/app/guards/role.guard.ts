import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { FrontendService } from '../services/frontend.service';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: FrontendService,
    public router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    if (token == null) {
      return false
    }
    function parseJwt(token: string) {
      var base64Payload = token.split('.')[1];
      var payload = Buffer.from(base64Payload, 'base64');
      return JSON.parse(payload.toString());
    }
    let payload = parseJwt(token);
    if (!this.authService.isAuth() || payload.role !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
