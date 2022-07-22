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
  collaborators: User[];
  customers: Customer[] = [];
  users: User[] = [];
  customer: any;

  constructor(private estimationEditService: EstimationEditService,
    private userService: UserService,
    private globalCriteriaService: GlobalCriteriaService,
    private elementWeightService: ElementWeightService) { }

  ngOnInit(): void {

    this.collaborators = this.estimation.collaborators;
    this.sortCollaborators();

    
  }

  sortCollaborators(): void {
    this.collaborators.sort((a, b) => {
      if (a.username > b.username) {
        return 1;
      }

      if (a.username < b.username) {
          return -1;
      }

      return 0;
    });
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
    if(!this.collaborators.find(c => c.username === event.username)) {
      var newCollaborator = new User();
      this.collaborators.push(event);
      this.sortCollaborators();
    }


  }

  deleteCollaborator(collaborator) {
    const index = this.collaborators.indexOf(collaborator, 0);
    this.collaborators.splice(index, 1);
  }

  updateCustomerString() {
    this.estimation.project.customer = {id: null, name: this.customer};
      this.globalCriteriaService.findGlobalCriteriaByEstimationId(1).subscribe((criteria) => {
        this.estimation.parameters = criteria;
        //TODO
      });
      this.elementWeightService.findElementWeightsByEstimationId(1).subscribe((weights) => {
        this.estimation.elementWeight = weights;
        //TODO
      });
  }

  updateCustomerObject() {
    this.estimation.project.customer = this.customer;
    this.globalCriteriaService.findGlobalCriteriaByEstimationCustomer(this.estimation.project.customer).subscribe((criteria) => {
      if(criteria == null || criteria == []) {
        this.globalCriteriaService.findGlobalCriteriaByEstimationId(1).subscribe((criteriaDefault) => {
          this.estimation.parameters = criteriaDefault;
          //TODO
        });
      }
      else {
        this.estimation.parameters = criteria;
        //TODO
      }
      this.elementWeightService.findElementWeightsByEstimationCustomer(this.estimation.project.customer).subscribe((weights) => {
        if(weights == null || weights == []) {
          this.elementWeightService.findElementWeightsByEstimationId(1).subscribe((weightsDefault) => {
            //TODO
            this.estimation.elementWeight = weightsDefault;
          });
        }
        else {
          //TODO
          this.estimation.elementWeight = weights;
        }
      });
    });
  }
}
