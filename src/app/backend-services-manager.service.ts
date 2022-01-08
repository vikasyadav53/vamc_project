import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from './modules/User';

@Injectable({
  providedIn: 'root'
})
export class BackendServicesManagerService {

  constructor(private http: HttpClient) { }

  saveUserDetails(user: User) : Observable<any> {
    const headers = {'content-type' : 'application/json'}
    const body = JSON.stringify(user);
    return this.http.post("http://localhost:3000/user/save", body, {'headers': headers, observe: 'response'});
  }

  authenticateUser(user: User) : Observable<any> {
    const headers = {'content-type' : 'application/json'}
    const body = JSON.stringify(user);
    return this.http.post("http://localhost:3000/user/authenticate", body, {'headers': headers, observe: 'response'});
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() : string | null | undefined {
    return localStorage.getItem("token") ;
  }


}
