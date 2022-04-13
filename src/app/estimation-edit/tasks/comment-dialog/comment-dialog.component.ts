import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  comment: String;

  constructor(public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.comment = this.config.data.comment;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  save() {
    this.dialogRef.close(this.comment);
  }

}
