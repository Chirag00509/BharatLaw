import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7204/api/User");
  }

  loginUser(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`https://localhost:7204/api/User/login?email=${email}&password=${password}`, { headers: headers });
  }

  registerUser(data: any[]): Observable<any[]> {
    return this.http.post<any[]>("https://localhost:7204/api/User", data)
  }

  forgot(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`https://localhost:7204/forgot?email=${email}`, { headers: headers });
  }

  getupdatePassword(password: string, token: string | null): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`https://localhost:7204/api/User/update-password?password=${password}&token=${token}`, { headers: headers });
  }

  updateProfile(token: string | null, data:any): Observable<any> {

    return this.http.put<any>(`https://localhost:7204/api/User/Update-profile?token=${token}`, data);
  }

  getDetailsByToken(token: string | null): Observable<any> {
    return this.http.get<any>(`https://localhost:7204/api/User/token?token=${token}`)
  }


}
