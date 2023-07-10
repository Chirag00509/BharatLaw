import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  forgot(email: string, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`https://localhost:7204/forgot?email=${email}&token=sopjmsd64981`, { headers: headers });
  }


}
