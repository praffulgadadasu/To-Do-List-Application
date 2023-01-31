import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm !: FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private frontEndService: FrontendService ) { }
 
  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }
  
  login(){
    this.http.post<any>("http://localhost:3000/api/v1/auth/login", this.loginForm.value)
    console.log(this.loginForm.value)
    this.frontEndService.signIn(this.loginForm.value).subscribe(res =>{
      console.log(res);
    })
  }
}
