import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Roles: any = ['User'];
  public registerForm !: FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router ) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      role:['',Validators.required]
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
