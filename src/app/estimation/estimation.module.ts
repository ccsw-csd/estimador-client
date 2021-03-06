import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationListComponent } from './estimation-list/estimation-list.component';
import { EstimationVersionsComponent } from './estimation-versions/estimation-versions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    EstimationListComponent,
    EstimationVersionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    DialogModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES'
  }]
})
export class EstimationModule { }
