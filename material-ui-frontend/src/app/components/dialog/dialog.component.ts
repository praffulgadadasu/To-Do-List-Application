import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public to_do_list_Form !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private dialogRef: MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.to_do_list_Form = this.formBuilder.group({
      to_do_list: ['', Validators.required]
    })
  }
  save() {
    if (this.to_do_list_Form.valid) {
      this.http.post<any>("http://localhost:3000/todolist", this.to_do_list_Form.value)
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
}
