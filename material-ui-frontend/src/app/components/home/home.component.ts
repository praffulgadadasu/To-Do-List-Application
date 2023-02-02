import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Buffer } from 'buffer';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any[] = [];
  email: any[] = [];
  displayedColumns: string[] = ['id', 'username', 'title', 'description'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public to_do_list_Form !: FormGroup;
  constructor( private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private dialog : MatDialog, private frontEndService: FrontendService ) { }
  ngOnInit() {
    this.to_do_list_Form = this.formBuilder.group({
      to_do_list:['']
    });
    this.getAllLists();
    const token = localStorage.getItem('token');
    if (token == null) {
      return;
    }
    let payload= this.parseJwt(token);
    this.name = payload.username;
    this.email = payload.email;
    console.log("payload:- ", payload);
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'25%',
      height:'21%'
    });
  }
  getAllLists(){
    this.http.get<any>("http://localhost:3000/api/v1/auth/todolist")
    .subscribe({
      next:(res) =>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error:(err)=>{
        alert("Internal Error while Fetching the Data!")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  parseJwt(token: string) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
}
