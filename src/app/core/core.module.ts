import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { UserResolverService } from './services/user-resolver.service';
import { DialogComponent } from './dialog/dialog.component';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {MenuModule} from 'primeng/menu';
import { MessageService } from 'primeng/api';




@NgModule({
  declarations: [LayoutComponent, HeaderComponent, NavComponent, DialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DynamicDialogModule,
    SidebarModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule,
    MenuModule
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    UserResolverService,
    DialogService,
    MessageService
  ],
})
export class CoreModule { }
