import { Component, Input, OnInit } from '@angular/core';
import { Estimation } from 'src/app/core/model/Estimation';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() estimation: Estimation;

  constructor() { }

  ngOnInit(): void {
  }

}
