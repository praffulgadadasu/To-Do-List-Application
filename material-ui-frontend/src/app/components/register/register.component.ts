import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Roles: any = ['Admin', 'Author', 'Reader'];
  public registerForm !: FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router ) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username:[''],
      email:[''],
      password:['']
    })
  }
  register(){
    this.http.post<any>("http://localhost:3000/api/v1/auth/register", this.registerForm.value)
    .subscribe(res => {
      alert("User Registered Successfully!");
      this.registerForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert("Something went wrong. Try Again Later!")
    })
  }
}
