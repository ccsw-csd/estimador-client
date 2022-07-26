import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Consideration } from 'src/app/core/model/Consideration';
import { CriteriaCalculationResponse } from 'src/app/core/model/CriteriaCalculationResponse';
import { CriteriaCalculationRequest } from 'src/app/core/model/CriteriaCalculationRequest';
import { Estimation } from 'src/app/core/model/Estimation';
import { TaskArchitecture } from 'src/app/core/model/TaskArchitecture';
import { TaskDevelopmentHours } from 'src/app/core/model/TaskDevelopmentHours';
import { CriteriaCalculationService } from '../services/criteriaCalculation/criteria-calculation.service';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { TaskDevelopmentWeights } from 'src/app/core/model/TaskDevelopmentWeights';
import { WeightCalculationRequest } from 'src/app/core/model/WeightCalculationRequest';
import { WeightCalculatorService } from '../services/weightCalculator/weight-calculator.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() estimation: Estimation;
  architectureTotal: number = 0;
  developmentTotal: number = 0;
  developmentWeightTotal: number = 0;
  globalTasks: CriteriaCalculationResponse[];

  constructor(public criteriaCalculationService: CriteriaCalculationService,
    public weightCalculatorService: WeightCalculatorService,
    public dialogService: DialogService,) { }

  ngOnInit(): void {

    this.estimation.developmentTasksHours.forEach(task => {
      this.calculateTotalHoursDevelopmentTask(task);
    });

    this.calculateTotalArchitecture();
    this.calculateTotalDevelopmentHours();
    this.calculateTotalDevelopmentWeight();
  }

  addArchitectureTask() {
    var task = new TaskArchitecture();
    task.hours = 0;
    this.estimation.architectureTasks.push(task);
  }

  addDevelopmentTask() {
    var task = new TaskDevelopmentHours();
    task.hours = 0;
    task.reusability = 0;
    task.totalHours = 0;
    this.estimation.developmentTasksHours.push(task);
  }

  addDevelopmentWeightTask() {
    var task = new TaskDevelopmentWeights();
    task.hours = 0;
    task.reusability = 0;
    task.quantityVerySimple = 0;
    task.quantitySimple = 0;
    task.quantityMedium = 0;
    task.quantityComplex = 0;
    task.workElementWeight = this.estimation.elementWeight[0];
    this.estimation.developmentTasksWeights.push(task);
  }

  addConsiderationComment() {
    this.estimation.considerations.push(new Consideration());
  }

  deleteArchitectureTask(task: TaskArchitecture) {
    const index = this.estimation.architectureTasks.indexOf(task, 0);
    this.estimation.architectureTasks.splice(index, 1);
    this.calculateTotalArchitecture();
  }

  deleteDevelopmentTask(task: TaskDevelopmentHours) {
    const index = this.estimation.developmentTasksHours.indexOf(task, 0);
    this.estimation.developmentTasksHours.splice(index, 1);
    this.calculateTotalDevelopmentHours();
    this.getGlobalTasks();
  }

  deleteDevelopmentWeightTask(task: TaskDevelopmentWeights) {
    const index = this.estimation.developmentTasksWeights.indexOf(task, 0);
    this.estimation.developmentTasksWeights.splice(index, 1);
    this.calculateTotalDevelopmentWeight();
    this.getGlobalTasks();
  }

  deleteConsideration(consideration: Consideration) {
    const index = this.estimation.considerations.indexOf(consideration, 0);
    this.estimation.considerations.splice(index, 1);
  }

  calculateTotalArchitecture() {
    this.architectureTotal = 0;
    this.estimation.architectureTasks.forEach(task => {
      if(task.hours == null) {
        task.hours = 0;
      }
      this.architectureTotal = this.architectureTotal + task.hours;
    });
  }

  calculateTotalDevelopmentHours() {
    this.developmentTotal = 0;
    this.estimation.developmentTasksHours.forEach(task => {
      this.developmentTotal = this.developmentTotal + task.totalHours;
    });
  }

  calculateTotalDevelopmentWeight() {
    this.developmentWeightTotal = 0;
    this.estimation.developmentTasksWeights.forEach(task => {
      this.developmentWeightTotal = this.developmentWeightTotal + task.hours;
    });
  }

  calculateTotalHoursDevelopmentTask(task: TaskDevelopmentHours) {
    var quantity = 1;

    if(task.quantity != null && task.quantity != undefined)
      quantity = task.quantity;

    task.totalHours = quantity * task.hours * (1 - task.reusability / 100);
  }

  getDevelopmentWeightsHours() {

    this.estimation.developmentTasksWeights.forEach(task => {
      task.elementName = task.workElementWeight.element;

      if(task.quantityVerySimple == null) {
        task.quantityVerySimple = 0;
      }

      if(task.quantitySimple == null) {
        task.quantitySimple = 0;
      }

      if(task.quantityMedium == null) {
        task.quantityMedium = 0;
      }

      if(task.quantityComplex == null) {
        task.quantityComplex = 0;
      }

      if(task.reusability == null) {
        task.reusability = 0;
      }
    });

    var calculationInfo = new WeightCalculationRequest();
    calculationInfo.tasks = this.estimation.developmentTasksWeights;
    calculationInfo.weights = this.estimation.elementWeight;

    if(calculationInfo.tasks.length > 0 && calculationInfo.weights.length > 0) {
      this.weightCalculatorService.calculateWeights(calculationInfo).subscribe((data) => {
        for(var i = 0; i < data.length; i++) {
          this.estimation.developmentTasksWeights[i].hours = data[i].totalHours;
        }
  
        this.calculateTotalDevelopmentWeight();
        this.getGlobalTasks();
      });
    }
  }

  getGlobalTasks() {
    var calculationInfo = new CriteriaCalculationRequest();
    calculationInfo.criteriaList = this.estimation.parameters;
    calculationInfo.archytectureHours = this.architectureTotal;

    if(this.estimation.showhours) {
      calculationInfo.hours = this.developmentTotal;
    }
    else {
      calculationInfo.hours = this.developmentWeightTotal;
    }


    this.criteriaCalculationService.calculateHoursWithCriteria(calculationInfo).subscribe((data) => {
      this.globalTasks = data;
    });
  }

  updateDevelopmentTask(task: TaskDevelopmentHours) {

    if(task.hours == null) {
      task.hours = 0;
    }

    if(task.reusability == null) {
      task.reusability = 0;
    }

    this.calculateTotalHoursDevelopmentTask(task);
    this.calculateTotalDevelopmentHours();
    this.getGlobalTasks();
  }

  openCommentDialog(task: any) {
    const ref = this.dialogService.open(CommentDialogComponent, {width: '750px', height: '450px', header:"Editar comentario", closable:false, data: {
      comment: task.comment}
    });

    ref.onClose.subscribe((response: any) => {
      if(response != false) {
        task.comment = response;
      } else if (response.length == 0) {
        task.comment = "";
      }
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
