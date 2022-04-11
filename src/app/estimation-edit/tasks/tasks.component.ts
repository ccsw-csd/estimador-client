import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Consideration } from 'src/app/core/model/Consideration';
import { CriteriaCalculationGet } from 'src/app/core/model/CriteriaCalculationGet';
import { CriteriaCalculationSend } from 'src/app/core/model/CriteriaCalculationSend';
import { Estimation } from 'src/app/core/model/Estimation';
import { TaskArchitecture } from 'src/app/core/model/TaskArchitecture';
import { TaskDevelopment } from 'src/app/core/model/TaskDevelopment';
import { CriteriaCalculationService } from '../services/criteriaCalculation/criteria-calculation.service';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() estimation: Estimation;
  architectureTotal: number = 0;
  developmentTotal: number = 0;
  globalTasks: CriteriaCalculationGet[];

  constructor(public criteriaCalculationService: CriteriaCalculationService,
    public dialogService: DialogService,) { }

  ngOnInit(): void {
    
    this.estimation.developmentTasks.forEach(task => {
      this.calculateTotalHoursDevelopmentTask(task);
    });

    this.calculateTotalArchitecture();
    this.calculateTotalDevelopment();
    this.getGlobalTasks();
  }

  addArchitectureTask() {
    var task = new TaskArchitecture();
    task.hours = 0;
    this.estimation.architectureTasks.push(task);
  }

  addDevelopmentTask() {
    var task = new TaskDevelopment();
    task.hours = 0;
    task.reusability = 0;
    task.totalHours = 0;
    this.estimation.developmentTasks.push(task);
  }

  addConsiderationComment() {
    this.estimation.considerations.push(new Consideration());
  }

  deleteArchitectureTask(task: TaskArchitecture) {
    const index = this.estimation.architectureTasks.indexOf(task, 0);
    this.estimation.architectureTasks.splice(index, 1);
    this.calculateTotalArchitecture();
  }

  deleteDevelopmentTask(task: TaskDevelopment) {
    const index = this.estimation.developmentTasks.indexOf(task, 0);
    this.estimation.developmentTasks.splice(index, 1);
    this.calculateTotalDevelopment();
  }

  deleteConsideration(consideration: Consideration) {
    const index = this.estimation.considerations.indexOf(consideration, 0);
    this.estimation.considerations.splice(index, 1);
  }

  calculateTotalArchitecture() {
    this.architectureTotal = 0;
    this.estimation.architectureTasks.forEach(task => {
      this.architectureTotal = this.architectureTotal + task.hours;
    });
  }

  calculateTotalDevelopment() {
    this.developmentTotal = 0;
    this.estimation.developmentTasks.forEach(task => {
      this.developmentTotal = this.developmentTotal + task.totalHours;
    });

    this.getGlobalTasks();
  }

  calculateTotalHoursDevelopmentTask(task: TaskDevelopment) {
    var quantity = 1;

    if(task.quantity != null && task.quantity != undefined)
      quantity = task.quantity;

    task.totalHours = quantity * task.hours * (1 - task.reusability);
  }

  getGlobalTasks() {
    var calculationInfo = new CriteriaCalculationSend();
    calculationInfo.criteriaList = this.estimation.globalCriteria;
    calculationInfo.hours = this.developmentTotal;

    this.criteriaCalculationService.calculateHoursWithCriteria(calculationInfo).subscribe((data) => {
      this.globalTasks = data;
    });
  }

  updateDevelopmentTask(task: TaskDevelopment) {
    this.calculateTotalHoursDevelopmentTask(task);
    this.calculateTotalDevelopment();
  }

  openCommentDialog(task: any) {
    const ref = this.dialogService.open(CommentDialogComponent, {width: '750px', height: '450px', header:"Editar comentario", closable:false, data: {
      comment: task.comment}
    });

    ref.onClose.subscribe((comment: String) => {
      if (comment) {
        task.comment = comment;
      }
    });
  }

}
