import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationListComponent } from './estimation-list/estimation-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    EstimationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES'
  }]
})
export class EstimationModule { }
