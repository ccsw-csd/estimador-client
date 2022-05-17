import { Component, Input, OnInit } from '@angular/core';
import { BlockCalculationRequest } from 'src/app/core/model/BlockCalculationRequest';
import { CriteriaCalculationRequest } from 'src/app/core/model/CriteriaCalculationRequest';
import { Estimation } from 'src/app/core/model/Estimation';
import { FteBlockCalculation } from 'src/app/core/model/FteBlockCalculation';
import { BlockCalculationService } from '../services/blockCalculation/block-calculation.service';
import { CriteriaCalculationService } from '../services/criteriaCalculation/criteria-calculation.service';
import { FteCalculationService } from '../services/fteCalculation/fte-calculation.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() estimation: Estimation;
  fteTotal: number = 0;

  constructor( private criteriaCalculationService: CriteriaCalculationService,
    private blockCalculationService: BlockCalculationService,
    private fteCalculationService: FteCalculationService ) { }

  ngOnInit(): void {
    this.estimation.profileParticipation.forEach(element => {
      this.calculateTotal(element.id);
    });
  }

  calculateTotal(id: number) {
    this.estimation.profileParticipation.forEach(row => {
      if(row.id == id) {
        this.updateGradeNullValues(row);
        row.total = row.a + row.b + row.c + row.d;
      }
    });
  }

  updateGradeNullValues(element) {
    element.a = this.changeNull(element.a);
    element.b = this.changeNull(element.b);
    element.c = this.changeNull(element.c);
    element.d = this.changeNull(element.d);
  }

  calculateBlockDuration() {
    var request = new BlockCalculationRequest();
    request.hours = this.calculateTotalDevelopmentHours();

    request.fteList = [];
    this.estimation.teamPyramid.forEach(fte => {
      var fteCalc = new FteBlockCalculation();
      fteCalc.name = fte.profile.name;
      fteCalc.personNumber = fte.fte;
      request.fteList.push(fteCalc);
    });

    var calculationInfo = new CriteriaCalculationRequest();
    calculationInfo.criteriaList = this.estimation.globalCriteria;
    calculationInfo.hours = request.hours;

    this.criteriaCalculationService.calculateHoursWithCriteria(calculationInfo).subscribe((data) => {
      request.criteriaList = data;

      this.blockCalculationService.calculateBlockDuration(request).subscribe((data) => {
        this.estimation.profileParticipation.forEach(element => {
          data.forEach(elementbd => {
            if(element.block.name == elementbd.blockName) {
              element.workdays = elementbd.workdays;
            }
          });
        });

        this.blockCalculationService.calculateTotalDuration(data).subscribe((duration) => {
          var managerValue = 0;
          var teamLeaderValue = 0;

          this.estimation.globalCriteria.forEach (criteria => {
            if(criteria.type == "Days/Month") {
              if(criteria.block.id == 10) {
                managerValue = criteria.value + managerValue;
              }
              else if (criteria.block.id == 20) {
                teamLeaderValue = criteria.value + teamLeaderValue;
              }
            }
          });

          this.estimation.profileParticipation.forEach(profile => {
            if(profile.block.id == 10) {
              profile.workdays = duration * managerValue;
            }
            else if(profile.block.id == 20) {
              profile.workdays = duration * teamLeaderValue;
            }
          })
        });
      })
    });
  }

  calculateTotalDevelopmentHours() {
    var hours = 0;

    if (this.estimation.showhours) {
      this.estimation.developmentTasksHours.forEach(task => {
        if (task.hours != null) {
          var quantity = 1;
          if (task.quantity != null && task.quantity != undefined) {
            quantity = task.quantity;
          }
          hours = hours + (quantity * task.hours * (1 - task.reusability / 100));
        }
      });
    }
    else {
      this.estimation.developmentTasksWeights.forEach(task => {
        if (task.hours != null)
          hours = hours + task.hours;
      });
    }

    return hours;
  }

  onFteChange() {
    this.calculateTotalFte();
    this.calculateBlockDuration();
  }

  calculateFixedFtes() {
    this.fteCalculationService.calculateFte(this.estimation.globalCriteria).subscribe((data) => {
      this.estimation.teamPyramid.forEach((element) => {
        if(element.profile.id == 10) {
          element.fte = data.manager;
        }
        else if (element.profile.id == 20) {
          element.fte = data.teamLeader; 
        }
      })
    });
  }

  calculateTotalFte() {
    this.fteTotal = 0;
    this.estimation.teamPyramid.forEach(element => {
      element.fte = this.changeNull(element.fte);
      this.fteTotal += element.fte;
    });
  }

  changeNull(value) {
    if(value == null) return 0;
    else return value;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
