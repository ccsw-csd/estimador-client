import { Component, Input, OnInit } from '@angular/core';
import { Estimation } from 'src/app/core/model/Estimation';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  @Input() estimation: Estimation;

  constructor() { }

  ngOnInit(): void {
  }

}
