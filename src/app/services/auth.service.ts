import { Injectable } from '@angular/core';


// TODO: Implement this service to handle authentication
// when we implement backend authorization.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  getAccessToken(): string {
    return '';
  }
}
