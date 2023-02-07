import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Buffer } from 'buffer';
import { FrontendService } from 'src/app/services/frontend.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  id: any[] = [];
  public to_do_list_Form !: FormGroup;
  actionBtn: string = "Save";
  Title: string = "Add To-Do List"
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private frontendservice: FrontendService) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token == null) {
      return;
    }
    let payload = this.parseJwt(token);
    console.log(payload._id);
    this.to_do_list_Form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      userEmail: [payload.email]
    })
    if (this.editData) {
      this.Title = "Update To-Do List";
      this.actionBtn = "Update";
      this.to_do_list_Form.controls['title'].setValue(this.editData.title);
      this.to_do_list_Form.controls['description'].setValue(this.editData.description);
    }
  }
  save() {
    if (!this.editData) {
      this.http.post<any>("http://localhost:3000/api/v1/auth/todolist", this.to_do_list_Form.value)
        .subscribe(res => {
          alert("To-Do List Created Successfully!");
          this.to_do_list_Form.reset();
          this.dialogRef.close('save');
        }, err => {
          alert("Something went wrong. Try Again Later!")
        })
    } else {
      this.updateList()
    }
  }
  updateList() {
    this.frontendservice.putList(this.to_do_list_Form.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("List Updated Successfully!");
          this.to_do_list_Form.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Something went wrong. Try Again Later!")
        }
      })
  }

  deleteList() {
    this.frontendservice.delList(this.editData.id)
  }

  parseJwt(token: string) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
}
