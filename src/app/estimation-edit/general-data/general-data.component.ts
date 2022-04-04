import { Component, Input, OnInit } from '@angular/core';
import { Collaborator } from 'src/app/core/model/Collaborator';
import { Customer } from 'src/app/core/model/Customer';
import { Estimation } from 'src/app/core/model/Estimation';
import { User } from 'src/app/core/model/User';
import { ElementWeightService } from '../services/elementWeight/element-weight.service';
import { EstimationEditService } from '../services/estimation-edit.service';
import { GlobalCriteriaService } from '../services/globalCriteria/global-criteria.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  @Input() estimation: Estimation;
  @Input() collaborators: Collaborator[];
  customers: Customer[] = [];
  users: User[] = [];
  nueva: boolean = false;
  customer: any;

  constructor(private estimationEditService: EstimationEditService,
    private userService: UserService,
    private globalCriteriaService: GlobalCriteriaService,
    private elementWeightService: ElementWeightService) { }

  ngOnInit(): void {

    if(this.estimation.id == undefined) {
      this.nueva = true;
      this.estimation.created = new Date();
    }
    else {
      var date = new Date(this.estimation.created);
      this.estimation.created = date;
    }
    this.estimation.lastUpdate = new Date();
  }

  searchCustomers(event) {
    this.estimationEditService.findCustomersByFilter(event.query).subscribe((data) => {
      this.customers = data;
    })
  }

  updateCustomer() {
    if(typeof(this.customer) === "string") {
      this.updateCustomerString();
    }
    else if(this.customer != null) {
      this.updateCustomerObject();
    }
  }

  searchCollaborator(event) {
    this.userService.findUsersByFilter(event.query).subscribe((data) => {
      this.users = data;
    })
  }

  addCollaborator(event) {
    if(!this.collaborators.find(c => c.collaborator.username === event.username)) {
      var newCollaborator = new Collaborator();
      newCollaborator.collaborator = event;
      newCollaborator.estimation = this.estimation;
      this.collaborators.push(newCollaborator);
    }
  }

  deleteCollaborator(collaborator) {
    const index = this.collaborators.indexOf(collaborator, 0);
    this.collaborators.splice(index, 1);
  }

  updateCustomerString() {
    this.estimation.project.customer = {id: null, name: this.customer};
      this.globalCriteriaService.findGlobalCriteriaByEstimation(1).subscribe((criteria) => {
        this.estimation.globalCriteria = criteria;
      });
      this.elementWeightService.findElementWeightsByEstimation(1).subscribe((weights) => {
        this.estimation.elementsWeights = weights;
      });
  }

  updateCustomerObject() {
    this.estimation.project.customer = this.customer;
    this.globalCriteriaService.findGlobalCriteriaByEstimationCustomer(this.estimation.project.customer).subscribe((criteria) => {
      if(criteria == null || criteria == []) {
        this.globalCriteriaService.findGlobalCriteriaByEstimation(1).subscribe((criteriaDefault) => {
          this.estimation.globalCriteria = criteriaDefault;
        });
      }
      else {
        this.estimation.globalCriteria = criteria;
      }
      this.elementWeightService.findElementWeightsByEstimationCustomer(this.estimation.project.customer).subscribe((weights) => {
        if(weights == null || weights == []) {
          this.elementWeightService.findElementWeightsByEstimation(1).subscribe((weightsDefault) => {
            this.estimation.elementsWeights = weightsDefault;
          });
        }
        else {
          this.estimation.elementsWeights = weights;
        }
      });
    });
  }
}
