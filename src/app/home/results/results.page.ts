import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../auth/user";
import {AuthResponse} from "../../auth/auth-response";

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  private user: AuthResponse;

  constructor(private authService: AuthService) {
    this.user = authService.currentUser();
    console.log(this.user);
  }

  ngOnInit() {
  }

}
