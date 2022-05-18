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

  constructor(private profileService: ProfileService,
    private blockService: BlockService,
    private estimationLevelService: EstimationLevelsService) {}

  ngOnInit(): void {
    
    this.blockService.findBlocks().subscribe((blocks) => {
      sessionStorage.setItem("blocks", JSON.stringify(blocks));
    });

    this.profileService.findProfiles().subscribe((profiles) => {
      sessionStorage.setItem("profiles", JSON.stringify(profiles));
    });

    this.estimationLevelService.findEstimationLevels().subscribe((levels) => {
      sessionStorage.setItem("levels", JSON.stringify(levels));
    });
  }
}

