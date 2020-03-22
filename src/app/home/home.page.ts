import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {log} from "util";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loggedIn : boolean;

  constructor(private  authService:  AuthService) {
    this.authService.isLoggedIn().subscribe((val:boolean)=>(this.loggedIn = val));
    this.loggedIn = false;
    log(this.isLoggedIn());
  }

  logout(){
    this.authService.logout().then((value => {this.loggedIn = false;  log(this.isLoggedIn())}));
  }


  isLoggedIn() {
    return this.loggedIn;
  }
}
