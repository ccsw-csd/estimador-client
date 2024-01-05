import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { EstimationModule } from './estimation/estimation.module';
import { EstimationEditModule } from './estimation-edit/estimation-edit.module';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';


registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    LoginModule,
    EstimationModule,
    EstimationEditModule
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    DialogService,
    MessageService,
    RefreshTokenResolverService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
