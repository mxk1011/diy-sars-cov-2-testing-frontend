import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  "https://app.epilamp.cpi.services";
       //'http://localhost:3000';
  authSubject  =  new  BehaviorSubject(false);
  user : AuthResponse;
  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/user/register`, user).pipe(
        tap(async (res:  AuthResponse ) => {

          if (res.user) {
            await this.storage.set("ACCESS_TOKEN", res.user.access_token);
            await this.storage.set("EXPIRES_IN", res.user.expires_in);
            this.authSubject.next(true);
            this.user = res;
          }
        })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth/login`, user).pipe(
        tap(async (res: AuthResponse) => {

          if (res.user) {
            await this.storage.set("ACCESS_TOKEN", res.user.access_token);
            await this.storage.set("EXPIRES_IN", res.user.expires_in);
            this.authSubject.next(true);
            this.user = res;
          }
        })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
    this.user = null;
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  currentUser() {
    return this.user;
  }
}
