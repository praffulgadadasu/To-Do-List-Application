import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Buffer } from 'buffer';
import { FrontendService } from 'src/app/services/frontend.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name: any[] = [];
  displayedColumns1: string[] = ['username', 'email', 'action'];
  dataSource1!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatSort) sort1!: MatSort;

  displayedColumns2: string[] = ['title', 'description'];
  dataSource2!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

  constructor( private http: HttpClient, private router: Router, private dialog: MatDialog, private frontEndService: FrontendService) {

  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token == null) {
      return;
    }
    let payload = this.parseJwt(token);
    this.name = payload.username;
    this.dataSource1 = new MatTableDataSource();
    this.getAllUsers();
    this.dataSource2 = new MatTableDataSource();
  }

  parseJwt(token: string) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
  logOutUser() {
    this.frontEndService.logout();
    this.router.navigate(['login']);
  }
  applyFilter(event: Event) {
    const filterValue1 = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue1.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  getAllUsers() {
    this.http.get<any[]>('http://localhost:3000/api/v1/auth/users', httpOptions)
      .subscribe(data => {
        this.dataSource1 = new MatTableDataSource(data);
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
      });
  }
  getAllAdminLists(email: string) {
    this.http.post<any[]>(`http://localhost:3000/api/v1/auth/admindata`, { email }, httpOptions)
      .subscribe(data => {
        this.dataSource2 = new MatTableDataSource(data);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      });
  }
}


