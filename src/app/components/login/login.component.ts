import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FrontendService } from 'src/app/services/frontend.service';
import { switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Roles: any = ['Admin', 'User'];

  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private frontEndService: FrontendService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  login() {
    const userData = this.loginForm.value;
    this.frontEndService.logInUser(userData).subscribe((res: any) => {
      console.log(res);
      if (userData.role == "Admin") {
        localStorage.setItem('token', res.token)
        this.router.navigate(['admin']);
      }
      if (userData.role == "User") {
        localStorage.setItem('token', res.token)
        this.router.navigate(['home']);
      }
    });
  }
}
