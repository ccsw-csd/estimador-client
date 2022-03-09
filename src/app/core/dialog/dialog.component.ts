import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  data: {description: string};

  constructor(
    public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.data = this.config.data;
  }

  yes(): void {
    this.dialogRef.close(true);
  }

  no() : void {
    this.dialogRef.close(false);
  }

}
