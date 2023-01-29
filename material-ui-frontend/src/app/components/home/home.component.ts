import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public to_do_list_Form !: FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router ) { }
  ngOnInit(): void {
    this.to_do_list_Form = this.formBuilder.group({
      to_do_list:['']
    })
  }
  save(){
    this.http.post<any>("http://localhost:3000/todolist", this.to_do_list_Form.value)
    .subscribe(res => {
      alert("To-Do List Created Successfully!");
      this.to_do_list_Form.reset();
      //this.router.navigate(['login']);
    }, err=>{
      alert("Something went wrong. Try Again Later!")
    })
  }
}
