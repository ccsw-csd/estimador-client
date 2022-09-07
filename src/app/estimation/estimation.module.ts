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
import { EstimationCreateCopyComponent } from './estimation-create-copy/estimation-create-copy.component';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [
    EstimationListComponent,
    EstimationVersionsComponent,
    EstimationCreateCopyComponent,
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
    InputSwitchModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES'
  }]
})
export class EstimationModule { }
