import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/sefidemo/auth';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi: String = 'http://localhost:8080/sefidemo/auth';

  constructor(
    private http: HttpClient,

  ) { }

  login(creds: any): Observable<any> {
    return this.http.post(`${AUTH_API}/signin`, {
      username: creds.username,
      password: creds.password
    },
      HTTP_OPTIONS);
  }


  // register(user): Observable<any> {
  //   return this.http.post(`${AUTH_API}/signup`, {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   }, HTTP_OPTIONS);
  // }


}
