import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUser() : Observable <any[]> {
    return this.http.get<any[]>("https://localhost:7204/api/User");
  }

  registerUser(data : any[]) : Observable<any[]> {
    return this.http.post<any[]>("https://localhost:7204/api/User", data)
  }

}
