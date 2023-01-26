import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/services/frontend.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    success: '',
    message: ''
  };
  constructor( private frontendService: FrontendService ){}
  ngOnInit(): void{

  }
  displayUserData(): void{
    this.frontendService.getAll()
    .subscribe(
      data =>{
        this.user = data;
        console.log(data.message);
      },
      error =>{
        console.log(error);
      }
    )
  }
}
