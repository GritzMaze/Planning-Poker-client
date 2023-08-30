import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../models/user';
import { EnvironmentService } from 'src/app/core/services/environment.service';

interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string;
  constructor(private http: HttpClient, environmentService: EnvironmentService) {
    this.apiUrl = environmentService.apiUrl;
   }

  login(user: any): Observable<string> {
    return this.http.post<Token>(`${this.apiUrl}/login`, user).pipe(
      tap((token: Token) => console.log(token)),
      map((token: Token) => token.token)
    );
  }

  register(user: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  refreshToken(): Observable<string> {
    return this.http.post<Token>(`${this.apiUrl}/refresh-token`, {}).pipe(
      map((token: Token) => token.token)
    );
  }

}
