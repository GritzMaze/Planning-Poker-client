import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


// TODO: Implement this service to handle authentication
// when we implement backend authorization.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private jwtHelperService: JwtHelperService) { }

  getAccessToken(): string {
    return localStorage.getItem('token') || '';
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    
    return !this.jwtHelperService.isTokenExpired(token);
    
  }

}
