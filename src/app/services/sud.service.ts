import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sud } from '../models/sud';

@Injectable({
  providedIn: 'root'
})
export class SudService {
  
  
  private readonly API_URL = 'http://localhost:8080/sud'; 

  constructor(private httpClient: HttpClient) { }

  public getAllSuds(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  }

  public addSud(sud: Sud): Observable<any> {
    return this.httpClient.post(this.API_URL, {
      naziv: sud.naziv,
      adresa: sud.adresa
    });
  }

  public updateSud(sud: Sud): Observable<any> {
    return this.httpClient.put(this.API_URL, sud);
  }

  public deleteSud(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}