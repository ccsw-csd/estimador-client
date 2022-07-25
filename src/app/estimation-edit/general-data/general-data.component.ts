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

  waitFunction = null;
  lastCustomer = null;

  updateCustomer() {

    if (this.waitFunction) clearTimeout(this.waitFunction);
    this.waitFunction = setTimeout(()=>{this.loadCustomerData()}, 200);
  }
  
  
  private loadCustomerData() {
    
    this.waitFunction = null;
    if (this.lastCustomer && this.customer && this.lastCustomer.id == this.customer.id) return;
    this.lastCustomer = this.customer;
    
    if (this.customer && this.customer.id) this.updateCustomerValues();
    else this.updateDefaultCustomerValues();
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

  updateDefaultCustomerValues() {
    this.estimation.project.customer = {id: null, name: this.customer};

    this.globalCriteriaService.findGlobalCriteriaByEstimationId(1).subscribe((parameters) => {
      this.estimation.parameters = parameters;
    });
    this.elementWeightService.findElementWeightsByEstimationId(1).subscribe((weights) => {
      this.estimation.elementWeight = weights;
    });
  }

  updateCustomerValues() {
    this.estimation.project.customer = this.customer;

    this.globalCriteriaService.findGlobalCriteriaByEstimationCustomer(this.estimation.project.customer).subscribe((parameters) => {
      this.estimation.parameters = parameters;
    });
    this.elementWeightService.findElementWeightsByEstimationCustomer(this.estimation.project.customer).subscribe((weights) => {
        this.estimation.elementWeight = weights;
    });

  }
}
