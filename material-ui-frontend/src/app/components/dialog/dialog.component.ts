import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  id: any[] = [];
  public to_do_list_Form !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private dialogRef: MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token == null) {
      return;
    }
    let payload= this.parseJwt(token);
    console.log(payload._id);
    this.to_do_list_Form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      userId: ['payload._id']
    })
    
  }
  save() {
    if (this.to_do_list_Form.valid) {
      this.http.post<any>("http://localhost:3000/api/v1/auth/todolist", this.to_do_list_Form.value)
        .subscribe(res => {
          alert("To-Do List Created Successfully!");
          this.to_do_list_Form.reset();
          this.dialogRef.close();
        }, err => {
          alert("Something went wrong. Try Again Later!")
        })
    }
    alert("List Cannot be Empty!");
  }
  parseJwt(token: string) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
}
