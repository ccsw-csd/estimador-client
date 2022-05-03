import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Block } from 'src/app/core/model/Block';
import { Criterion } from 'src/app/core/model/Criterion';
import { ElementWeight } from 'src/app/core/model/ElementWeight';
import { Estimation } from 'src/app/core/model/Estimation';
import { EstimationLevel } from 'src/app/core/model/EstimationLevel';
import { EstimationEditService } from '../services/estimation-edit.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  @Input() estimation: Estimation;
  blocks: Block[] = [];
  levels: EstimationLevel[] = [];
  types: string[] = ["% about development", "Days/Month"];

  constructor(private estimationEditService: EstimationEditService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {

    this.estimationEditService.findBlocks().subscribe((data) => {
      this.blocks = data;
    });

    this.estimationEditService.findEstimationLevels().subscribe((data) => {
      this.levels = data;
    });
  }

  addCriterion() {
    var criterion = new Criterion();
    criterion.block = new Block();
    criterion.value = 0;
    this.estimation.globalCriteria.push(criterion);
  }

  deleteCriterion(criterion: Criterion) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Estas seguro de eliminar esta fila?',
      icon: 'pi pi-trash',
      acceptLabel: 'Si',
      accept: () => {
        const index = this.estimation.globalCriteria.indexOf(criterion, 0);
        this.estimation.globalCriteria.splice(index, 1);
      },
      reject: () => {
      }
  });
  }

  addElementWeight() {
    var element = new ElementWeight();
    element.level = new EstimationLevel();
    element.simple = 0;
    element.verySimple = 0;
    element.medium = 0;
    element.complex = 0;
    this.estimation.elementsWeights.push(element);
  }

  deleteElementWeight(elementWeight: ElementWeight) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Estas seguro de eliminar esta fila?',
      icon: 'pi pi-trash',
      acceptLabel: 'Si',
      accept: () => {
        const index = this.estimation.elementsWeights.indexOf(elementWeight, 0);
        this.estimation.elementsWeights.splice(index, 1);
      },
      reject: () => {
      }
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  checkNull(value) {
    if(value == null) {
      return 0;
    }
    return value;
  }
}
