import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, map, switchMap, catchError, from } from 'rxjs';
import { MessageService } from './services/message.service';
import { EnvironmentService } from './services/environment.service';
import { AuthService } from './services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private apiUrl: string;

  constructor(
    private environmentService: EnvironmentService,
    private authService: AuthService,
    private messageService: MessageService) {
    this.apiUrl = this.environmentService.apiUrl;
  }

  isApiRequest(request: HttpRequest<unknown>): boolean {
    return request.url.startsWith(this.apiUrl);
  }

  isAuthRequest(request: HttpRequest<unknown>): boolean {
    return request.url.startsWith(this.apiUrl + '/auth');
  }

  isUserRequest(request: HttpRequest<unknown>): boolean {
    return request.url.startsWith(this.apiUrl + '/users');
  }

  handleHttpError(error: HttpErrorResponse): void {
    let errorMessage: string;

    try {
      const fault = JSON.parse(error.error);
      errorMessage = fault.message;

      if (fault.status === 500) {
        errorMessage = `${fault.status}: ${errorMessage}`;
      }
    } catch (e) {
      errorMessage = error.error;
    }

    this.messageService.showError(errorMessage);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isApiRequest(request)) {
      return this.handleRequest(request, next);
    }

    return next.handle(request);
  }

  private handleRequest(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return from(this.authService.getAccessToken()).pipe(
      map((accessToken: string) => {
        let headers = request.headers;

        if (accessToken) {
          headers = headers.append('Authorization', `Bearer ${accessToken}`);
        }

        const newRequest = request.clone({ headers });

        return newRequest;
      }),
      switchMap((newRequest: HttpRequest<unknown>) => next.handle(newRequest)),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          this.handleHttpError(error);

          // TODO: When we have authentication, we need to handle 401 errors

          // if (error.status === 401) {
          //   if (this.isAuthRequest(request)) {
          //     this.authService.logout();
          //   } else if (this.isUserRequest(request)) {
          //     this.authService.logout();
          //   } else {
          //     return this.authService.refreshToken();
          //   }
          // }
        }
        throw error;
      })
    );
  }
}
