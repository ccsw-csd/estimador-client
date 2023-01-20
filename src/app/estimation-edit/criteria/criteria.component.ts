import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Block } from 'src/app/core/model/Block';
import { Criterion } from 'src/app/core/model/Criterion';
import { ElementWeight } from 'src/app/core/model/ElementWeight';
import { Estimation } from 'src/app/core/model/Estimation';
import { EstimationLevel } from 'src/app/core/model/EstimationLevel';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() estimation: Estimation;
  blocks: Block[] = [];
  levels: EstimationLevel[] = [];
  types: string[] = ["% about development", "Days/Month"];

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.blocks = JSON.parse(sessionStorage.getItem("blocks"));
    this.levels = JSON.parse(sessionStorage.getItem("levels"));
  }

  addCriterion() {
    var criterion = new Criterion();
    criterion.block = new Block();
    criterion.value = 0;
    this.estimation.parameters.push(criterion);
  }

  deleteCriterion(criterion: Criterion) {

    this.confirmationService.confirm({
      header: 'Eliminar criterio global',
      message: '¿Estás seguro que deseas eliminar esta fila?',
      icon: 'pi pi-trash',
      acceptLabel: 'Sí',
      accept: () => {
        const index = this.estimation.parameters.indexOf(criterion, 0);
        this.estimation.parameters.splice(index, 1);
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
    this.estimation.elementWeight.push(element);
  }

  deleteElementWeight(elementWeight: ElementWeight) {
    this.confirmationService.confirm({
      header: 'Eliminar peso de componente',
      message: '¿Estás seguro que deseas eliminar esta fila?',
      icon: 'pi pi-trash',
      acceptLabel: 'Sí',
      accept: () => {
        const index = this.estimation.elementWeight.indexOf(elementWeight, 0);
        this.estimation.elementWeight.splice(index, 1);
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
