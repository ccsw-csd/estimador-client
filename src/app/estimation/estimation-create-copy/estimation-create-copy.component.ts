import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Estimation } from 'src/app/core/model/Estimation';
import { EstimationService } from '../estimation.service';

@Component({
  selector: 'app-estimation-create-copy',
  templateUrl: './estimation-create-copy.component.html',
  styleUrls: ['./estimation-create-copy.component.scss']
})
export class EstimationCreateCopyComponent implements OnInit {

  estimation: Estimation;
  originalVersion: string;
  versionError: boolean = false;
  loading: boolean = false;

  constructor(public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public estimationService: EstimationService) { 

      this.estimation = config.data;
      this.originalVersion = this.estimation.estVersion;
    }

  ngOnInit(): void {
  }

  duplicate(): void {

    this.versionError = false;
    if (this.estimation.estVersion == this.originalVersion) {
      this.versionError = true;
      return;
    }
    
    this.loading = true;
    this.estimationService.duplicate(this.estimation).subscribe((response) => {
      this.loading = false;
      this.dialogRef.close(response);
    });

  }

  close() : void {
    this.dialogRef.close(false);
  }

}
