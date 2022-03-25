import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationEditComponent } from './estimation-edit/estimation-edit.component';
import {TabViewModule} from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { GeneralDataComponent } from './general-data/general-data.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { TasksComponent } from './tasks/tasks.component';
import { SummaryComponent } from './summary/summary.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    EstimationEditComponent,
    GeneralDataComponent,
    CriteriaComponent,
    TasksComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    AutoCompleteModule,
    TableModule
  ]
})
export class EstimationEditModule { }
