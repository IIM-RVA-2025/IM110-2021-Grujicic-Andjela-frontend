import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Predmet } from '../models/predmet';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {
  private readonly API_URL = 'http://localhost:8080/predmet';

  constructor(private httpClient: HttpClient) { }

  public getAllPredmets(): Observable<Predmet[]> {
    return this.httpClient.get<Predmet[]>(this.API_URL);
  }

  public addPredmet(predmet: any): Observable<any> {
    return this.httpClient.post(this.API_URL, predmet);
  }

  public updatePredmet(predmet: any): Observable<any> {
    
    return this.httpClient.put(`${this.API_URL}/${predmet.id}`, predmet);
  }

  public deletePredmet(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}