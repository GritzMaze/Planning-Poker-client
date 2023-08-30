import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/server/models/user';
import { UserService } from 'src/app/server/services/user.service';
import { Buffer } from 'buffer';


interface UserInput {
  username: string;
  password: string;
}

interface RegisterInput extends UserInput {
  email: string;
  name: string;
  confirmPassword: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService, private userService: UserService) { }

  getAccessToken(): string | null {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    
    return !this.jwtHelperService.isTokenExpired(token);
    
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  register(user: RegisterInput): Observable<User> {
    Object.assign(user, { password: this.encodePassword(user.password) });
    const { confirmPassword, ...rest } = user;
    return this.userService.register(rest);
  }

  login(user: UserInput): Observable<string> {
    Object.assign(user, { password: this.encodePassword(user.password) });
    return this.userService.login(user).pipe(
      tap(token => this.setToken(token))
    );
  }

  encodePassword(password: string): string {
    const newPass = Buffer.from(password).toString('base64');
    return newPass;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  refreshToken(): Observable<string> {
    return this.userService.refreshToken().pipe(
      tap(token => this.setToken(token))
    );
  }

}
