import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from 'src/app/core/services/environment.service';
import { Card } from '../models/card';

@Injectable()
export class CardService {
  private apiUrl: string;
  constructor(private http: HttpClient, environmentService: EnvironmentService) {
    this.apiUrl = environmentService.apiUrl;
   }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/cards/${id}`);
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/cards`, card);
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/cards/${card.id}`, card);
  }
}
