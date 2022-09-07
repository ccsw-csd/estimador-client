import { Component, OnInit } from '@angular/core';
import { BlockService } from './estimation-edit/services/block/block.service';
import { EstimationLevelsService } from './estimation-edit/services/estimationLevels/estimation-levels.service';
import { ProfileService } from './estimation-edit/services/profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'estimador';

  constructor() {
    
  }

  ngOnInit(): void {
  }
}

