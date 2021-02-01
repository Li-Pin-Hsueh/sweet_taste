import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8080/" ;

  constructor( private httpClient: HttpClient) { }

  getUser() : Observable<User[]> {
    const apiUrl = this.baseUrl + 'user' ;
    return this.httpClient.get<User[]>(apiUrl) ;
  }

  doLogin(user) {
    const apiUrl = this.baseUrl + 'login' ;
    return this.httpClient.post(apiUrl, user);
  }


}