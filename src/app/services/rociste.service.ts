import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rociste } from '../models/rociste';

@Injectable({
  providedIn: 'root'
})
export class RocisteService {
  
  private readonly API_URL = 'http://localhost:8080/rociste';

  constructor(private httpClient: HttpClient) { }

  public getAllRocista(): Observable<Rociste[]> {
    return this.httpClient.get<Rociste[]>(this.API_URL);
  }

  public addRociste(rociste: Rociste): Observable<any> {
    return this.httpClient.post(this.API_URL, rociste);
  }

  public updateRociste(rociste: Rociste): Observable<any> {
    return this.httpClient.put(this.API_URL, rociste);
  }

  public deleteRociste(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}