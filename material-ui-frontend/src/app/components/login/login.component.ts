import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router ) { }
  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/api/v1/auth/login")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email == this.loginForm.value.email && a.password == this.loginForm.value.password
      });
      if(user){
        alert("User Logged In Successfully!");
        this.loginForm.reset();
        this.router.navigate(['home'])
      }else{
        alert("Invalid Credentials!")
      }
    },err=>{
      alert("Something went wrong. Try Again Later!")
    })
  }
}
