import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationListComponent } from './estimation-list/estimation-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    EstimationListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES'
  }]
})
export class EstimationModule { }
