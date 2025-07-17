import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiLogin ="http://localhost:8080/login";
  private apiRegister  = "http://localhost:8080/register";
  
  constructor(private http : HttpClient) { }

  login(username:string, password:string): Observable<any>{
    const body = {username,password};
    return this.http.post<any>(this.apiLogin,body,{
      headers : new HttpHeaders({
          'Content-Type':'application/json'
      })
    })
  }

  register(username:string, password:string): Observable<any>{
    const body = {username,password};
    return this.http.post<any>(this.apiRegister,body,{
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    })
  }
}
