import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "../auth/auth-response";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {tap} from "rxjs/operators";
import {Test} from "./test";
import {TestResponse} from "./test-response";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  TEST_SERVER_ADDRESS: string = 'http://localhost:3020';
  testSubject = new BehaviorSubject(false);
  test: TestResponse;

  constructor(private  httpClient: HttpClient, private  storage: Storage) {
  }

  submit(test: Test): Observable<TestResponse> {
    return this.httpClient.post<TestResponse>(`${this.TEST_SERVER_ADDRESS}/submit`, test).pipe(
        tap(async (res: TestResponse) => {

          if (res.test) {
            this.testSubject.next(true);
            this.test = res;
          }
        })
    );
  }
}