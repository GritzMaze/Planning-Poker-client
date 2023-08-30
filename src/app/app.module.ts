import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UiModule } from './ui/ui.module';
import { CoreModule } from './core/core.module';
import { ServerModule } from './server/server.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ApiInterceptor } from './api.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    UiModule,
    CoreModule,
    ServerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:3000'],
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
