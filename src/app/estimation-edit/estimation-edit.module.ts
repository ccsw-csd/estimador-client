import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationEditComponent } from './estimation-edit/estimation-edit.component';
import {TabViewModule} from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { GeneralDataComponent } from './general-data/general-data.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { TasksComponent } from './tasks/tasks.component';
import { SummaryComponent } from './summary/summary.component';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



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
    BlockUIModule,
    PanelModule,
    ProgressSpinnerModule
  ]
})
export class EstimationEditModule { }
