import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockService } from 'src/app/estimation-edit/services/block/block.service';
import { EstimationLevelsService } from 'src/app/estimation-edit/services/estimationLevels/estimation-levels.service';
import { ProfileService } from 'src/app/estimation-edit/services/profile/profile.service';
import { AuthService } from '../services/auth.service';
import { NavigatorService } from '../services/navigator.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit { 

  @Output() toggleMenuEmitter: EventEmitter<any> = new EventEmitter();

  visibleSideBar = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private navigatorService : NavigatorService,
    public router: Router,
    private profileService: ProfileService,
    private blockService: BlockService,
    private estimationLevelService: EstimationLevelsService,   
    ) { }

  ngOnInit() {

    this.authService.registerAccess().subscribe();

    this.activatedRoute.data.subscribe(response => {       
      this.authService.refreshToken(response.credentials);
      //this.loadDetailedUserInfo(response);
      this.loadMasterData();    
    }); 

  }


  private loadMasterData() : void {

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

  private loadDetailedUserInfo(response: any) : void {

    //No está activado el userResolver
    if (response == null || Object.keys(response).length == 0) return;

    if (response.user == null) {
      this.authService.logout();
      return;
    }

    this.authService.putUserInfoDetailed(response.user); 
  }



  public toggleMenu() : void {
    this.visibleSideBar = !this.visibleSideBar;

    this.navigatorService.emitNavigatorChangeEvent(this.visibleSideBar);
  }
}
