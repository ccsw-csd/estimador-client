import { Component, Input, OnInit } from '@angular/core';
import { Estimation } from 'src/app/core/model/Estimation';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() estimation: Estimation;

  constructor() { }

  ngOnInit(): void {
  }

}
