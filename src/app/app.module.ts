import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AgGridModule } from 'ag-grid-angular';
import { LoginModule } from './login/login.module';
import { EstimationModule } from './estimation/estimation.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'
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
    AgGridModule.withComponents([]),
    EstimationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
