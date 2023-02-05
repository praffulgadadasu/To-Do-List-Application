import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name: any[] = [];
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token == null) {
      return;
    }
    let payload= this.parseJwt(token);
    this.name = payload.username;
    console.log("payload:- ", payload);
  }

  parseJwt(token: string) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
}


