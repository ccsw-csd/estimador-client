import { Component, Input, OnInit } from '@angular/core';
import { Estimation } from 'src/app/core/model/Estimation';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  @Input() estimation: Estimation;

  constructor() { }

  ngOnInit(): void {
  }

}
