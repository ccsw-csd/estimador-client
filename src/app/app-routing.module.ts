import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { EstimationEditComponent } from './estimation-edit/estimation-edit.component';
import { EstimationListComponent } from './estimation/estimation-list/estimation-list.component';
import { LoginComponent } from './login/login/login.component';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    resolve: {credentials: RefreshTokenResolverService},
    canActivate: [AuthGuard],
    children: [
      { path: 'main', component: EstimationListComponent,},
      { path: 'estimation-edit/:id', component: EstimationEditComponent},
      { path: 'estimation-edit', component: EstimationEditComponent},
      { path: '**', redirectTo: 'main', pathMatch: 'full' },
    ]
  },  
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
