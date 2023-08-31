import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from 'src/app/core/services/environment.service';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
private apiUrl: string;
  constructor(private http: HttpClient, environmentService: EnvironmentService) {
    this.apiUrl = environmentService.apiUrl;
   }

   getColumnById(id: number): Observable<Column> {
    return this.http.get<Column>(`${this.apiUrl}/columns/${id}`);
   }
}
