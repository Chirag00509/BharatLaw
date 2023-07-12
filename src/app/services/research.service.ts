import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  createResearch(data: any) : Observable<any> {

    console.log(data);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>("https://localhost:7204/api/ResearchBook", data, { headers : headers } );
  }

  getResearchDetails() : Observable<any> {
    return this.http.get<any>("https://localhost:7204/api/ResearchBook");
  }

}
