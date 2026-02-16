import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ucesnik } from '../models/ucesnik';

@Injectable({
  providedIn: 'root'
})
export class UcesnikService {
  private readonly API_URL = 'http://localhost:8080/ucesnik';

  constructor(private httpClient: HttpClient) { }

  public getAllUcesniks(): Observable<Ucesnik[]> {
    return this.httpClient.get<Ucesnik[]>(this.API_URL);
  }

  public addUcesnik(ucesnik: Ucesnik): Observable<any> {
    return this.httpClient.post(this.API_URL, ucesnik);
  }

  public updateUcesnik(ucesnik: Ucesnik): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/${ucesnik.id}`, ucesnik);
  }

  public deleteUcesnik(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}