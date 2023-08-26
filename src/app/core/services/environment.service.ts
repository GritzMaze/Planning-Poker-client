import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

private static instance: EnvironmentService;

  static getInstance(): EnvironmentService {
    if (!EnvironmentService.instance) {
      EnvironmentService.instance = new EnvironmentService();
    }
    return EnvironmentService.instance;
  }

  constructor() { 
    if (EnvironmentService.instance) {
      throw new Error('Error: Instantiation failed: Use EnviromentService.getInstance() instead of new.');
    }
    EnvironmentService.instance = this;


  }

  get isProduction(): boolean {
    return environment.production;
  }

  get isDevelopment(): boolean {
    return !environment.production;
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }
}
