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
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private frontEndService: FrontendService, private cookie: CookieService ) { }
 
  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
      role:['', Validators.required]
    })
  }
  
  login(){
    const data = this.loginForm.value;
    
    this.frontEndService.logInUser(data).subscribe((res:any) =>{
      console.log(res);
      localStorage.setItem('token', res.token)
      this.router.navigate(['home'])
    });

    /* let authFlow = this.frontEndService
    .logInUser(data)
    .pipe(
      switchMap(() => this.frontEndService.Userprofile()));
    
    authFlow.subscribe({
      next:(user: UserResponseModel) => {
        this.frontEndService.saveUserToLocalStorage(user);
      }
    }) */
  }
}
